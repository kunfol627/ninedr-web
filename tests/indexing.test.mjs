import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {Miniflare} = createRequire(require.resolve('wrangler/package.json'))('miniflare');
import {isProduction} from '../lib/indexing-policy.mjs';

test('only the exact production hostname is allowed, ignoring forwarded headers',()=>{
 for(const host of ['ninedr-web.kun-fol627.workers.dev','test.ninedr.com','www.ninedr.com.evil.test','localhost'])
  assert.equal(isProduction(new Request(`https://${host}/`,{headers:{'x-forwarded-host':'www.ninedr.com'}})),false);
 assert.equal(isProduction(new Request('https://www.ninedr.com/')),true);
 assert.equal(JSON.parse(readFileSync('wrangler.jsonc','utf8')).assets.run_worker_first,true);
});

test('runtime HTML and headers isolate production, previews, errors and verification',async()=>{
 const source=readFileSync('lib/indexing-policy.mjs','utf8').replaceAll('export ', '');
 const mf=new Miniflare({modules:true,script:source+`
 export default {fetch(request){
 const u=new URL(request.url);
 const verification=u.pathname.includes('googleb357');
 const html=verification?'google-site-verification: googleb357467bdf4840d3.html':'<html><head><meta name="robots" content="index, follow"><meta name="googlebot" content="noindex"></head><body>STATIC OR SSR</body></html>';
 return applyIndexingPolicy(request,new Response(html,{status:u.pathname==='/missing'?404:200,headers:{'content-type':'text/html','x-robots-tag':'none'}}));
 }};`});
 try {
 for(const host of ['www.ninedr.com','ninedr-web.kun-fol627.workers.dev','test.ninedr.com']){
  for(const path of ['/','/insights/example','/geo/','/golfkit/faq.html']){
   const r=await mf.dispatchFetch(`https://${host}${path}`);const h=await r.text();
   const expected=host==='www.ninedr.com'?'index, follow':'noindex, follow';
   assert.equal(r.headers.get('x-robots-tag'),expected);
   assert.match(h,new RegExp('content="'+expected+'"'));
   assert.equal((h.match(/name="robots"/g)||[]).length,1);
   assert.ok(!h.includes('googlebot'));
  }
 }
 const error=await mf.dispatchFetch('https://www.ninedr.com/missing');assert.equal(error.status,404);assert.equal(error.headers.get('x-robots-tag'),'noindex, follow');
 const v=await mf.dispatchFetch('https://www.ninedr.com/googleb357467bdf4840d3.html');assert.equal(await v.text(),readFileSync('public/googleb357467bdf4840d3.html','utf8'));
 }finally{await mf.dispose();}
});
