import test from 'node:test';
import assert from 'node:assert/strict';
import {handleContact} from '../lib/contact-handler.mjs';
const env={CONTACT_ENABLED:'true',RESEND_API_KEY:'test-not-real',CONTACT_FROM:'Ninedr <website@mail.ninedr.com>',TURNSTILE_SITE_KEY:'test',TURNSTILE_SECRET_KEY:'test'};
const data={name:'測試',company:'驗證用公司',email:'test@example.com',direction:'整合行銷',message:'測試內容，不寄出',consent:true,token:'test'};
const request=(body=data,origin='https://www.ninedr.com')=>new Request('https://www.ninedr.com/api/contact',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
const noNetwork=()=>{throw new Error('Unexpected network call')};
test('unconfigured form remains unavailable and exposes no secrets',async()=>{const res=await handleContact(new Request('https://www.ninedr.com/api/contact'),{},noNetwork);assert.deepEqual(await res.json(),{enabled:false,siteKey:null});assert.equal((await handleContact(request(),{},noNetwork)).status,503)});
test('cross-origin, malformed, oversized and unconsented requests rejected',async()=>{assert.equal((await handleContact(request(data,'https://other.example'),env,noNetwork)).status,403);for(const body of [{...data,email:'bad'}, {...data,company:'Injected\r\nheader'}, {...data,consent:false},{...data,website:'spam'},null])assert.equal((await handleContact(request(body),env,noNetwork)).status,400);assert.equal((await handleContact(request({...data,message:'x'.repeat(25000)}),env,noNetwork)).status,413)});
test('failed or wrong-host verification never sends email',async()=>{for(const v of [{success:false},{success:true,hostname:'other.example',action:'contact'},{success:true,hostname:'www.ninedr.com',action:'login'}]){let calls=0;const res=await handleContact(request(),env,async()=>{calls++;return Response.json(v)});assert.equal(res.status,400);assert.equal(calls,1)}});
test('only server-defined To and CC used; Reply-To is visitor email',async()=>{let payload;const res=await handleContact(request({...data,to:['attacker@example.com'],cc:[]}),env,async(url,options)=>{if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'});payload=JSON.parse(options.body);return Response.json({id:'mock-id'})});assert.equal(res.status,200);assert.deepEqual(payload.to,['info@ninedr.com']);assert.deepEqual(payload.cc,['cathy@ninedr.com','steven@ninedr.com']);assert.equal(payload.reply_to,'test@example.com');assert.equal(payload.html,undefined)});
test('provider rejection and timeout do not produce success',async()=>{for(const fails of [false,true]){const res=await handleContact(request(),env,async url=>{if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'});if(fails)throw new Error('timeout');return Response.json({error:'rejected'},{status:422})});assert.equal(res.status,502);assert.notEqual((await res.json()).ok,true)}});
test('Cloudflare binding preserves recipients and Reply-To without Resend',async()=>{let payload;const cf={...env,RESEND_API_KEY:undefined,EMAIL:{send:async message=>{payload=message;return {messageId:'mock-cf'}}}};const res=await handleContact(request(),cf,async url=>{assert.ok(url.includes('siteverify'));return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'})});assert.equal(res.status,200);assert.deepEqual(payload.cc,['cathy@ninedr.com','steven@ninedr.com']);assert.equal(payload.replyTo,'test@example.com');assert.equal(payload.reply_to,undefined)});
test('Cloudflare rejection never reports success',async()=>{const cf={...env,EMAIL:{send:async()=>{throw new Error('rejected')}}};const res=await handleContact(request(),cf,async()=>Response.json({success:true,hostname:'www.ninedr.com',action:'contact'}));assert.equal(res.status,502)});

test('optional phone is included in email and blank or omitted values are accepted',async()=>{for(const phone of [undefined,'','+886 912 345 678']){let payload;const res=await handleContact(request({...data,phone}),env,async(url,options)=>{if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'});payload=JSON.parse(options.body);return Response.json({id:'mock-id'})});assert.equal(res.status,200);assert.ok(payload.text.includes(`手機號碼：${phone||'未填寫'}`))}});
test('malformed optional phone never reaches verification or email',async()=>{for(const phone of [123,{},'x'.repeat(41),'123\\r\\nInjected'.replaceAll('\\r','\r').replaceAll('\\n','\n')])assert.equal((await handleContact(request({...data,phone}),env,noNetwork)).status,400)});

test('business consulting enquiries are accepted and included in email',async()=>{let payload;const res=await handleContact(request({...data,direction:'企業顧問與數位轉型'}),env,async(url,options)=>{if(url.includes('siteverify'))return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'});payload=JSON.parse(options.body);return Response.json({id:'mock-id'})});assert.equal(res.status,200);assert.ok(payload.subject.includes('企業顧問與數位轉型'));assert.ok(payload.text.includes('合作方向：企業顧問與數位轉型'))});

test('disabled, missing and whitespace configuration never calls external services',async()=>{
 const cases=[{...env,CONTACT_ENABLED:'false'},{...env,CONTACT_ENABLED:true},...['CONTACT_FROM','TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY','RESEND_API_KEY'].flatMap(key=>[undefined,'','   '].map(value=>({...env,[key]:value}))),{...env,RESEND_API_KEY:undefined,EMAIL:{send:true}}];
 for(const config of cases){
  const res=await handleContact(new Request('https://www.ninedr.com/api/contact'),config,noNetwork);
  assert.equal(res.headers.get('Cache-Control'),'no-store');
  assert.deepEqual(await res.json(),{enabled:false,siteKey:null});
  assert.equal((await handleContact(request(),config,noNetwork)).status,503);
 }
});
test('GET exposes only public readiness and site key without verifying or sending',async()=>{
 const res=await handleContact(new Request('https://www.ninedr.com/api/contact'),env,noNetwork);
 assert.deepEqual(await res.json(),{enabled:true,siteKey:'test'});
});
test('workers.dev requires explicit origin and matching Turnstile hostname',async()=>{
 const origin='https://ninedr-preview.example.workers.dev';
 assert.equal((await handleContact(request(data,origin),env,noNetwork)).status,403);
 const config={...env,CONTACT_PREVIEW_ORIGIN:origin};
 assert.equal((await handleContact(request(data,origin+'.evil.example'),config,noNetwork)).status,403);
 for(const hostname of [new URL(origin).hostname,'www.ninedr.com']){
  let sends=0;
  const res=await handleContact(request(data,origin),config,async url=>{
   if(url.includes('siteverify'))return Response.json({success:true,hostname,action:'contact'});
   sends++;return Response.json({id:'mock'});
  });
  assert.equal(res.status,hostname===new URL(origin).hostname?200:400);
  assert.equal(sends,hostname===new URL(origin).hostname?1:0);
 }
});
test('expired, reused, unavailable or malformed Turnstile response never sends',async()=>{
 for(const result of [()=>Response.json({success:false,'error-codes':['timeout-or-duplicate']}),()=>Response.json({success:true,hostname:'www.ninedr.com',action:'contact'},{status:503}),()=>new Response('invalid'),()=>{throw new Error('timeout')}]){
  let calls=0;
  const res=await handleContact(request(),env,async url=>{calls++;assert.ok(url.includes('siteverify'));return result()});
  assert.ok([400,502].includes(res.status));assert.equal(calls,1);
 }
});
test('Resend restrictions and missing acceptance id do not report success',async()=>{
 for(const result of [()=>Response.json({error:'domain not verified'},{status:403}),()=>Response.json({error:'rate limit'},{status:429}),()=>Response.json({})]){
  const res=await handleContact(request(),env,async url=>url.includes('siteverify')?Response.json({success:true,hostname:'www.ninedr.com',action:'contact'}):result());
  assert.equal(res.status,502);
 }
});
test('Cloudflare is preferred and never retries through Resend after ambiguous result',async()=>{
 for(const result of [()=>({messageId:'mock'}),()=>({}),()=>{throw new Error('timeout')}]){
  let sends=0;
  const config={...env,EMAIL:{send:async()=>{sends++;return result()}}};
  let calls=0;
  const res=await handleContact(request(),config,async url=>{calls++;assert.ok(url.includes('siteverify'));return Response.json({success:true,hostname:'www.ninedr.com',action:'contact'})});
  assert.ok([200,502].includes(res.status));assert.equal(sends,1);assert.equal(calls,1);
 }
});
