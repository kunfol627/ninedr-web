const $=(q,r=document)=>r.querySelector(q);const $$=(q,r=document)=>Array.from(r.querySelectorAll(q));
const header=$('#header');const menu=$('#mobile-menu');const menuButton=$('.menu-toggle');
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>40||!menu.hidden)}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
function setMenu(open){menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'關閉選單':'開啟選單');document.body.classList.toggle('menu-open',open);updateHeader()}
menuButton.addEventListener('click',()=>setMenu(menu.hidden));$$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false);menuButton.focus()}});
document.addEventListener('focusin',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!header.contains(e.target))menuButton.focus()});
const themeButton=$('.theme-toggle');function syncTheme(){themeButton.setAttribute('aria-label',document.documentElement.dataset.theme==='light'?'切換深色主題':'切換淺色主題')}
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;try{localStorage.setItem('ninedr-local-theme',next)}catch(e){}syncTheme()});syncTheme();
const dialogs=$$('dialog');let lastTrigger=null;
function showModal(dialog,trigger){lastTrigger=trigger||document.activeElement;setMenu(false);dialog.showModal();document.body.classList.add('modal-open')}
dialogs.forEach(dialog=>{const closer=$('.modal-close',dialog);closer.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});dialog.addEventListener('close',()=>{if(!dialogs.some(d=>d.open)){document.body.classList.remove('modal-open');lastTrigger?.focus()}})});
const inquiry=$('#inquiry-dialog'),form=$('#inquiry-form');
function openInquiry(plan,area,trigger){if(plan&&Array.from(form.elements.plan.options).some(o=>o.value===plan))form.elements.plan.value=plan;if(area&&Array.from(form.elements.area.options).some(o=>o.value===area))form.elements.area.value=area;$('.form-status').textContent='';showModal(inquiry,trigger);prepareInquiryVerification()}
$$('[data-inquiry]').forEach(b=>b.addEventListener('click',()=>openInquiry(b.dataset.plan,null,b)));
const regionTrack=$('.region-track'),regionPrev=$('#region-prev'),regionNext=$('#region-next');
function syncRegionControls(){regionPrev.disabled=regionTrack.scrollLeft<2;regionNext.disabled=regionTrack.scrollLeft+regionTrack.clientWidth>=regionTrack.scrollWidth-2}
function slideRegion(direction){const card=$('.region-card');regionTrack.scrollBy({left:direction*(card.getBoundingClientRect().width+24),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
regionPrev.addEventListener('click',()=>slideRegion(-1));regionNext.addEventListener('click',()=>slideRegion(1));regionTrack.addEventListener('scroll',syncRegionControls,{passive:true});window.addEventListener('resize',syncRegionControls);syncRegionControls();
regionTrack.addEventListener('keydown',e=>{if(e.target!==regionTrack)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();slideRegion(e.key==='ArrowRight'?1:-1)}});
$$('[data-region]').forEach(b=>b.addEventListener('click',()=>openInquiry(null,b.dataset.region,b)));
function inquiryText(){const data=new FormData(form);return ['九色鹿團隊您好：','','我想了解社區廣告／社區合作服務。',`聯絡人：${data.get('name')||''}`,`社區名稱：${data.get('company')||''}`,`Email：${data.get('email')||''}`,`手機號碼：${data.get('mobile')||''}`,`市內電話：${data.get('telephone')||''}`,`LINE ID：${data.get('line')||''}`,`感興趣的方案：${data.get('plan')}`,`目標生活圈：${data.get('area')}`,'','需求說明：',data.get('message')||'希望先了解合適的安排。'].join('\n')}

let inquiryToken='',inquiryWidget=null,verificationLoading=null,sending=false;
function resetInquiryVerification(){
 inquiryToken='';
 if(inquiryWidget!==null&&window.turnstile)window.turnstile.reset(inquiryWidget);
}
async function prepareInquiryVerification(){
 if(inquiryWidget!==null||verificationLoading)return verificationLoading;
 const status=$('.form-status');
 verificationLoading=(async()=>{
  try{
   const response=await fetch('/api/contact',{headers:{Accept:'application/json'}});
   const config=await response.json();
   if(!response.ok||!config.enabled||!config.siteKey)throw new Error('線上表單暫時無法使用，請透過 info@ninedr.com 或官方 LINE 聯繫。');
   if(!window.turnstile)await new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async=true;
    script.onload=resolve;
    script.onerror=()=>{script.remove();reject(new Error('驗證服務載入失敗，請重新開啟表單再試。'))};
    document.head.appendChild(script);
   });
   inquiryWidget=window.turnstile.render('#inquiry-verification',{
    sitekey:config.siteKey,action:'contact',theme:'auto',size:'flexible',
    callback:token=>{inquiryToken=token;status.textContent=''},
    'expired-callback':()=>{inquiryToken='';status.textContent='驗證已過期，請重新驗證。'},
    'error-callback':()=>{inquiryToken='';status.textContent='驗證未完成，請稍後重試。'}
   });
  }catch(error){status.textContent=error.message||'驗證服務暫時無法使用，請稍後再試。'}
  finally{verificationLoading=null}
 })();
 return verificationLoading;
}
form.addEventListener('submit',async e=>{
 e.preventDefault();
 if(sending||!form.reportValidity())return;
 const status=$('.form-status'),button=$('.form-submit');
 if(!inquiryToken){status.textContent='請先完成防機器人驗證。';await prepareInquiryVerification();return}
 const data=new FormData(form);
 const payload={
  name:String(data.get('name')||'').trim(),
  company:String(data.get('company')||'').trim()||'未提供社區名稱',
  email:String(data.get('email')||'').trim(),
  phone:String(data.get('mobile')||'').trim(),
  direction:'其他合作',message:inquiryText(),
  consent:data.get('consent')==='on',website:String(data.get('website')||''),token:inquiryToken
 };
 sending=true;button.disabled=true;form.setAttribute('aria-busy','true');
 status.textContent='正在寄送，請稍候…';
 try{
  const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(30000)});
  const result=await response.json();
  if(!response.ok||result.ok!==true)throw new Error(result.error||'無法確認寄送結果，請透過 Email 或官方 LINE 聯繫。');
  status.textContent='需求已成功送出，九色鹿團隊將透過您提供的聯絡方式回覆。';
  form.reset();previousLine='';syncLine();
 }catch(error){status.textContent=error.name==='TimeoutError'?'連線逾時，無法確認寄送結果。請透過 Email 或官方 LINE 聯繫，避免重複送出。':error.message||'寄送未完成，請稍後再試。'}
 finally{sending=false;button.disabled=false;form.removeAttribute('aria-busy');resetInquiryVerification()}
});

$('.copy-inquiry').addEventListener('click',async()=>{const value=inquiryText();try{await navigator.clipboard.writeText(value);$('.form-status').textContent='已複製洽詢內容，可貼入郵件寄至 info@ninedr.com。'}catch(e){const t=document.createElement('textarea');t.value=value;t.setAttribute('aria-label','可複製的洽詢內容');t.style.cssText='width:100%;min-height:180px;margin-top:12px';form.appendChild(t);t.focus();t.select();$('.form-status').textContent='請複製下方已選取的洽詢內容。'}});
const articles={creative:{category:'素材準備 / CREATIVE',title:'讓人一眼看懂的社區廣告，應該放哪些內容？',body:'<p>社區廣告往往在出入大廳或等電梯時被看見。讀者停留的時間不一定長，因此第一件事，是讓人迅速理解你能提供什麼。</p><h3>一張廣告，先說清楚一件事。</h3><p>把最重要的服務、活動或需求放在主標。品牌名稱、服務範圍與聯絡方式維持清楚，避免同時放入太多優惠與細節。</p><h3>讓閱讀順序自然發生。</h3><ul><li>主標：你提供什麼，或能解決什麼問題。</li><li>補充：最值得被理解的特色與適用對象。</li><li>下一步：清楚的聯絡、預約或活動入口。</li></ul><h3>送印前，把現場條件確認好。</h3><p>依確認的刊位尺寸與方向製作素材，檢查字級、日期、聯絡資訊與圖片解析度。若使用 QR Code，請以實際印製尺寸測試連結與掃描。</p><p>詳細檔案規格、審稿與交稿時間，將依確認的方案提供。</p>'},area:{category:'投放規劃 / STRATEGY',title:'先想清楚生活圈，再決定品牌的曝光範圍。',body:'<p>在地投放的起點，是理解品牌能服務哪裡、希望與誰建立連結。範圍越大不一定越合適，先找到與生意有關的生活圈更重要。</p><h3>先回答三個問題。</h3><ul><li>顧客願意走多遠、花多少時間來找你？</li><li>服務是否受交通、配送或到府範圍影響？</li><li>這次要推廣短期活動，還是累積長期熟悉感？</li></ul><h3>把目標與安排對上。</h3><p>首次認識生活圈，可以從聚焦的區域組合開始；需要較多接觸點，再討論擴大包。希望持續溝通的品牌，則可評估連續刊登的期數與素材安排。</p><h3>確認內容，才開始合作。</h3><p>確認固定組合中的範圍、社區、刊位、張數、刊期與費用。刊登紀錄反映執行狀況；對詢問、預約或來客的目標，應另外討論衡量方式。</p>'},partner:{category:'社區合作 / PARTNERSHIP',title:'讓社區的日常空間，成為在地品牌的連結點。',body:'<p>九色鹿歡迎管委會與授權管理窗口洽詢，將合適的社區廣告空間，整理成清楚、可執行的合作資源。</p><h3>準備這些資訊，開始討論。</h3><ul><li>社區位置、授權狀態與管理聯絡窗口。</li><li>刊位實景、位置說明、尺寸、方向與可刊張數。</li><li>印製與張貼能力，以及可刊日期、產業限制。</li><li>每張每期價格及包含的服務範圍。</li></ul><h3>分工清楚，日常執行更順暢。</h3><p>平台負責審核資源、規劃區域組合、接單審稿與驗收。合作社區依核准定稿印製張貼，並回傳照片與實際日期；異常情況由雙方共同確認後續安排。</p><h3>把現場與住戶隱私一起照顧好。</h3><p>刊位應符合合作授權與社區規範。驗收照片請避免拍入人臉、門牌個資或含個資的公告。付款與結算條件會在正式合作前確認。</p>'}};
$$('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[b.dataset.article];$('#article-content').innerHTML=`<span class="eyebrow">${a.category}</span><h2 id="article-title">${a.title}</h2>${a.body}<button class="button button-accent" id="article-inquiry">與九色鹿聊聊 <svg aria-hidden="true"><use href="#arrow"/></svg></button>`;showModal($('#article-dialog'),b);$('#article-inquiry').addEventListener('click',()=>{$('#article-dialog').close();openInquiry(b.dataset.article==='partner'?'社區合作':null,null,b)})}));

const samePhone=$('#line-same'),lineInput=form.elements.line,mobileInput=form.elements.mobile;let previousLine='';
function syncLine(){if(samePhone.checked)lineInput.value=mobileInput.value;lineInput.readOnly=samePhone.checked}
samePhone.addEventListener('change',()=>{if(samePhone.checked)previousLine=lineInput.value;else lineInput.value=previousLine;syncLine()});mobileInput.addEventListener('input',syncLine);
$('#cookie-settings').addEventListener('click',e=>showModal($('#cookie-dialog'),e.currentTarget));
$('#reset-preferences').addEventListener('click',()=>{try{localStorage.removeItem('ninedr-local-theme')}catch(e){}document.documentElement.dataset.theme='dark';syncTheme();$('#cookie-status').textContent='已清除主題偏好，恢復深色模式。'});
