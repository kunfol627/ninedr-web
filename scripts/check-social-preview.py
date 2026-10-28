"""HTTP/HTML audit; UA simulation does not verify actual platform caches/IPs."""
import argparse, concurrent.futures, hashlib, json, struct, subprocess, tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
class Tags(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags={}; self.in_head=False; self.head_tags={}
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='head': self.in_head=True
        key=a.get('property',a.get('name')) if tag=='meta' else 'canonical' if tag=='link' and a.get('rel')=='canonical' else None
        value=a.get('content') if tag=='meta' else a.get('href')
        if key:
            self.tags.setdefault(key,[]).append(value)
            if self.in_head:self.head_tags.setdefault(key,[]).append(value)
    def handle_endtag(self,tag):
        if tag=='head':self.in_head=False
UAS={'browser':'Mozilla/5.0','line':'facebookexternalhit/1.1;line-poker/1.0','facebook':'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'}
def fetch(url,ua):
    with tempfile.TemporaryDirectory() as folder:
        h=Path(folder)/'headers';b=Path(folder)/'body'
        p=subprocess.run(['curl','-sS','-L','--max-time','30','-A',ua,'-D',str(h),'-o',str(b),'-w','%{http_code}\n%{url_effective}',url],capture_output=True,text=True)
        if p.returncode:raise RuntimeError(p.stderr)
        status,final=p.stdout.split('\n',1); data=b.read_bytes()
        return {'status':int(status),'final_url':final,'headers':h.read_text(),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()},data
parser=argparse.ArgumentParser();parser.add_argument('--origin',default='https://www.ninedr.com');parser.add_argument('--output',required=True);parser.add_argument('--expect-new',action='store_true');args=parser.parse_args()
def check(job):
    name,path=job; result,data=fetch(args.origin+path,UAS[name]);t=Tags();t.feed(data.decode()); result.update(ua=name,path=path,tags=t.tags,head_tags=t.head_tags)
    if t.tags.get('og:image'):
        image_url=t.tags['og:image'][0]
        # A local preview must test its own asset, not the deployed absolute URL.
        asset=args.origin+image_url.split('https://www.ninedr.com',1)[-1]
        image,b=fetch(asset,UAS[name]); image['url']=asset
        image['dimensions']=list(struct.unpack('>II',b[16:24])) if b.startswith(b'\x89PNG') else None
        result['image']=image
    if args.expect_new:
        assert result['status']==200,result
        for key in ['og:title','og:description','og:image','og:url','og:type']:
            assert len(t.head_tags.get(key,[]))==1,(path,key,t.head_tags)
        assert result['image']['status']==200 and result['image']['dimensions']==[1200,630]
        assert 'image/png' in result['image']['headers'].lower()
        expected='index, follow' if args.origin=='https://www.ninedr.com' else 'noindex, follow'
        assert t.tags['robots']==[expected]
        assert 'x-robots-tag: '+expected in result['headers'].lower()
        assert t.tags['canonical'][0].rstrip('/')==('https://www.ninedr.com'+path).rstrip('/')
        assert t.tags['og:url'][0].rstrip('/')==t.tags['canonical'][0].rstrip('/')
        assert t.tags['twitter:image']==t.tags['og:image']
    return result
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(check,[(u,p) for u in UAS for p in ['/','/o2o']]))
for path in ['/','/o2o']:
    subset=[r for r in results if r['path']==path];assert all(r['tags']==subset[0]['tags'] for r in subset),'UA metadata mismatch'
Path(args.output).write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print(json.dumps([{'ua':r['ua'],'path':r['path'],'status':r['status'],'image':r.get('image',{}).get('dimensions'),'robots':r['tags'].get('robots')} for r in results],ensure_ascii=False,indent=2))
