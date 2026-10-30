import test from 'node:test';
import assert from 'node:assert/strict';
import {createAnalytics,validPreference,readPreference,CONSENT_KEY,CONSENT_LIFETIME,MEASUREMENT_ID} from '../lib/analytics.mjs';
function fixture(url='https://www.ninedr.com/contact?email=private@example.com#private'){
 let scripts=[];const cookieWrites=[];
 const timers=[];
 const win={location:new URL(url),setTimeout:(callback,delay)=>{timers.push({callback,delay});return 1},clearTimeout:()=>{},dispatchEvent:()=>{}};
 const doc={title:'聯絡九色鹿',referrer:'https://example.com/page?email=secret#private',get cookie(){return '_ga=old; _ga_S7TGMX204R=old; unrelated=keep'},set cookie(v){cookieWrites.push(v)},querySelector:()=>scripts[0]||null,createElement:()=>({dataset:{},remove(){scripts=scripts.filter(s=>s!==this)}}),head:{appendChild:s=>scripts.push(s)}};
 return {win,doc,cookieWrites,timers,analytics:createAnalytics(win,doc),scripts:()=>scripts,commands:()=>Array.from(win.dataLayer||[],x=>Array.from(x))};
}
const yes=()=>({analytics:true,at:Date.now()});
const events=f=>f.commands().filter(x=>x[0]==='event');
test('preference is purpose-specific, bounded in time and resilient to storage failures',()=>{
 assert.equal(CONSENT_KEY,'ninedr-cookie-preference-v2');
 for(const p of [null,{}, {analytics:'true',at:Date.now()},{analytics:true,at:Date.now()+1000},{analytics:true,at:Date.now()-CONSENT_LIFETIME}])assert.ok(!validPreference(p));
 assert.ok(validPreference(yes()));
 assert.equal(readPreference({getItem(){throw Error('blocked')}}),null);
 assert.equal(readPreference({getItem(){return '{broken'}}),null);
});
test('missing, denied, expired consent and previews never load GA or queue events',()=>{
 for(const url of ['https://www.ninedr.com/','https://preview.workers.dev/','https://www.ninedr.com.evil.test/','http://www.ninedr.com/']){
  const f=fixture(url);
  for(const choice of [null,{analytics:false,at:Date.now()},{analytics:true,at:Date.now()-CONSENT_LIFETIME}]){
   f.analytics.setConsent(choice);f.analytics.pageView();f.analytics.leadAccepted(true,true);f.analytics.contactClick('mailto:test@example.com');
  }
  if(!url.startsWith('https://www.ninedr.com/'))f.analytics.setConsent(yes());
  assert.equal(f.scripts().length,0);assert.equal(events(f).length,0);
 }
});
test('accept initializes once and page views deduplicate query/hash but track route changes',()=>{
 const f=fixture();f.analytics.setConsent(yes());f.analytics.setConsent(yes());f.analytics.pageView();
 assert.equal(f.scripts().length,1);assert.equal(f.commands().filter(x=>x[0]==='config').length,1);
 assert.equal(events(f).length,1);
 assert.equal(f.commands().find(x=>x[0]==='config')[2].send_page_view,false);
 f.win.location=new URL('https://www.ninedr.com/contact?another=1');f.analytics.pageView();assert.equal(events(f).length,1);
 f.win.location=new URL('https://www.ninedr.com/services');f.analytics.pageView();assert.equal(events(f).length,2);
 const payload=JSON.stringify(events(f));assert.ok(!payload.includes('private'));assert.ok(!payload.includes('secret'));
 assert.equal(events(f)[0][2].send_to,MEASUREMENT_ID);
});
test('leads require both API success flags; contact clicks pass only classified parameters',()=>{
 const f=fixture();f.analytics.setConsent(yes());
 for(const pair of [[false,false],[false,true],[true,false],[true,undefined]])assert.equal(f.analytics.leadAccepted(...pair),false);
 assert.equal(f.analytics.leadAccepted(true,true),true);
 f.analytics.contactClick('mailto:info@ninedr.com?body=private-data','footer');f.analytics.contactClick('https://line.me/R/ti/p/%40800rczvx');f.analytics.contactClick('tel:0988790503');
 f.analytics.contactClick('https://line.me.evil.test/');f.analytics.contactClick('/services');
 assert.equal(events(f).filter(x=>x[1]==='generate_lead').length,1);
 assert.deepEqual(events(f).filter(x=>x[1]==='contact_click').map(x=>x[2].contact_method),['email','line','phone']);
 assert.ok(!JSON.stringify(events(f)).includes('private-data'));assert.ok(!JSON.stringify(events(f)).includes('0988790503'));
});
test('revoking before SDK load clears queue; reaccept initializes cleanly without replay',()=>{
 const f=fixture();f.analytics.setConsent(yes());f.analytics.leadAccepted(true,true);
 f.analytics.setConsent({analytics:false,at:Date.now()});
 assert.equal(f.win['ga-disable-'+MEASUREMENT_ID],true);assert.equal(f.scripts().length,0);assert.equal(events(f).length,0);
 f.analytics.setConsent(yes());assert.equal(f.scripts().length,1);assert.equal(f.commands().filter(x=>x[0]==='config').length,1);assert.equal(events(f).length,1);
 assert.ok(f.cookieWrites.every(x=>!x.startsWith('unrelated=')));
});
test('revoking after SDK load disables events and retains only one SDK on reaccept',()=>{
 const f=fixture();f.analytics.setConsent(yes());f.scripts()[0].onload();
 f.analytics.setConsent({analytics:false,at:Date.now()});const count=events(f).length;
 assert.equal(f.analytics.leadAccepted(true,true),false);assert.equal(events(f).length,count);
 assert.equal(f.win['ga-disable-'+MEASUREMENT_ID],true);
 f.analytics.setConsent(yes());assert.equal(f.win['ga-disable-'+MEASUREMENT_ID],false);assert.equal(f.scripts().length,1);
});
test('blocked script can retry without duplicate queued events',()=>{
 const f=fixture();f.analytics.setConsent(yes());f.scripts()[0].onerror();f.analytics.setConsent(yes());assert.equal(events(f).length,1);assert.equal(f.scripts().length,1);
});

test('180-day consent uses bounded browser timers rather than overflowing immediately',()=>{
 const f=fixture();f.analytics.setConsent(yes());assert.ok(f.timers[0].delay>1000);assert.ok(f.timers[0].delay<=2147483647);
 f.timers[0].callback();assert.equal(f.timers.length,2);assert.equal(f.win['ga-disable-'+MEASUREMENT_ID],false);
});
