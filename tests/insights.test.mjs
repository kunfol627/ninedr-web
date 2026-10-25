import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../content/articles.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {articles,publishedArticles,cleanInsightText}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
test('future imports remove literal bold markers across public nested fields without mutating source',()=>{
 const sample={title:'**標題**',sections:[{bodyHtml:'<strong>保留語意</strong>與**文字**'}],faqs:[{answer:'**回答**'}],sources:[{url:'https://example.com/report#page=9'}],draft:false};
 const result=cleanInsightText(sample);
 assert.equal(result.title,'標題');assert.equal(result.sections[0].bodyHtml,'<strong>保留語意</strong>與文字');assert.equal(result.faqs[0].answer,'回答');assert.equal(result.sources[0].url,sample.sources[0].url);assert.equal(result.draft,false);assert.equal(sample.title,'**標題**');
});
test('all published insights have clean text, working internal references and unique sections',()=>{
 const published=publishedArticles();const slugs=new Set(published.map(a=>a.slug));
 assert.equal(slugs.size,published.length);
 for(const a of published){
  assert.ok(!JSON.stringify(a).includes('**'),a.slug);
  assert.equal(new Set(a.sections.map(s=>s.id)).size,a.sections.length,a.slug);
  for(const section of a.sections)for(const match of (section.bodyHtml||'').matchAll(/href="\/insights\/([^"#]+)"/g))assert.ok(slugs.has(match[1]),match[1]);
 }
 const videos=published.filter(a=>a.category==='短影音行銷');assert.equal(videos.length,19);
 for(const a of videos){assert.ok(a.takeaways.length>=3);assert.ok(a.faqs.length>=3);assert.match(a.author.name,/Steven/);assert.ok(a.cta.label);}
 assert.equal(JSON.stringify(articles).match(/<iframe/g).length,55);
 const frequency=published.find(a=>a.slug==='short-video-posting-frequency');
 const platforms=published.find(a=>a.slug==='short-video-platform-strategy');
 for(const page of [30,96,105])assert.ok(JSON.stringify(frequency).includes('startpage='+page));
 for(const page of [96,101,105,109])assert.ok(JSON.stringify(platforms).includes('startpage='+page));
 const ai=published.find(a=>a.slug==='digital-2027-ai-consumer-behavior-brand-opportunities');
 assert.ok(!/Digital 2027(?!:Global Overview Report)/.test(JSON.stringify(ai)));
 assert.ok(JSON.stringify(ai).includes('startpage=199'));
 assert.equal(published.length,54);
});

test('Taiwan–Philippines comparison includes sources and conversion journey',()=>{const a=publishedArticles().find(a=>a.slug==='taiwan-philippines-digital-marketing-differences');assert.equal(a.category,'跨境市場');assert.equal(a.faqs.length,4);assert.equal(a.takeaways.length,5);assert.match(a.author.name,/Steven/);assert.equal(a.cta.label,'預約品牌健檢');assert.equal(JSON.stringify(a).match(/<iframe/g).length,2);assert.equal(JSON.stringify(a).match(/startpage=18/g).length,4);assert.ok(a.sections.some(s=>s.id==='summary'));});
