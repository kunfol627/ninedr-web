'use client';
import Arrow from "@/app/arrow";

import {useEffect,useRef,useState} from 'react';
type Turnstile={render:(el:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void;reset:(id:string)=>void};
declare global{interface Window{turnstile?:Turnstile}}
const directions=['整合行銷','廣告投放與媒介操作','廣告創意與內容產製','品牌策略與整合行銷','SEO / GEO / Local SEO','品牌設計','其他合作'];
export default function Contact(){
 const [config,setConfig]=useState<{enabled:boolean;siteKey?:string}|null>(null);
 const [token,setToken]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[sent,setSent]=useState(false),[summary,setSummary]=useState('');
 const widget=useRef<HTMLDivElement>(null),widgetId=useRef<string|undefined>(undefined);
 useEffect(()=>{const controller=new AbortController();fetch('/api/contact',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(value=>setConfig(value as {enabled:boolean;siteKey?:string})).catch(()=>{if(!controller.signal.aborted)setConfig({enabled:false})});return()=>controller.abort()},[]);
 useEffect(()=>{
  if(!config?.enabled||!config.siteKey)return;
  let disposed=false;
  const render=()=>{if(disposed||!widget.current||!window.turnstile)return;window.turnstile && (widgetId.current=window.turnstile.render(widget.current,{sitekey:config.siteKey,theme:'dark',size:'flexible',action:'contact',callback:(value:string)=>setToken(value),'expired-callback':()=>setToken(''),'error-callback':()=>{setToken('');setNotice('驗證暫時無法載入，請重新整理或使用 Email 聯繫。')}}))};
  let script=document.querySelector<HTMLScriptElement>('script[data-contact-verification]');
  if(window.turnstile)render();else{if(!script){script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.dataset.contactVerification='true';document.head.appendChild(script)}script.addEventListener('load',render)}
  return()=>{disposed=true;script?.removeEventListener('load',render);if(widgetId.current)window.turnstile?.remove(widgetId.current);widgetId.current=undefined};
 },[config]);
 return <form onSubmit={async e=>{
  e.preventDefault();if(busy||sent)return;
  const form=e.currentTarget,data=new FormData(form);
  const body={name:String(data.get('稱呼')||''),company:String(data.get('公司')||''),email:String(data.get('電子郵件')||''),phone:String(data.get('手機號碼')||'').trim(),direction:String(data.get('合作方向')||''),message:String(data.get('品牌願景')||''),website:String(data.get('website')||''),consent:data.get('consent')==='on',token};
  setNotice('');
  if(!config?.enabled){setSummary(`九色鹿 Ninedr｜合作需求\n\n稱呼：${body.name}\n公司：${body.company}\n電子郵件：${body.email}\n手機號碼：${body.phone||'未填寫'}\n合作方向：${body.direction}\n\n${body.message}`);return}
  setBusy(true);
  try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});const result=await response.json() as {ok?:boolean;error?:string;message?:string};if(!response.ok||!result.ok)throw new Error(result.error||'寄送未完成，請透過 Email 或 LINE 聯繫。');setNotice(result.message||'需求已提交。');setSent(true);form.reset()}
  catch(error){setNotice(error instanceof Error&&error.name!=='TimeoutError'?error.message:'無法確認寄送結果，請透過 Email 或 LINE 聯繫。')}
  finally{setBusy(false);setToken('');if(widgetId.current)window.turnstile?.reset(widgetId.current)}
 }} aria-busy={busy}>
 <div className="form-row"><label>您的稱呼 *<input name="稱呼" autoComplete="name" placeholder="如何稱呼您？" required maxLength={80}/></label><label>品牌 / 公司 *<input name="公司" autoComplete="organization" placeholder="您的品牌名稱" required maxLength={100}/></label></div>
 <label>電子郵件 *<input name="電子郵件" autoComplete="email" type="email" placeholder="you@company.com" required maxLength={254}/></label>
 <label>手機號碼（非必填）<input name="手機號碼" autoComplete="tel" type="tel" inputMode="tel" placeholder="方便聯繫您的手機號碼" maxLength={40}/></label>
 <label>想一起探索的方向<select name="合作方向" defaultValue="整合行銷">{directions.map(d=><option key={d}>{d}</option>)}</select></label>
 <label>您的品牌願景 *<textarea name="品牌願景" rows={3} placeholder="分享您的目標、挑戰或專案時程…" required maxLength={4000}/></label>
 <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="contact-consent"><input name="consent" type="checkbox" required/><span>我已閱讀<a href="/privacy" target="_blank" rel="noopener noreferrer">隱私政策</a>，同意九色鹿為回覆本次諮詢處理所填資料。{config?.enabled&&'本表單透過 Cloudflare 提供安全驗證，並透過 Resend 傳送您填寫的諮詢資料至九色鹿信箱。'}</span></label>
 {config?.enabled&&<div ref={widget} className="contact-verification"/>}
 <button className="lime-button" type="submit" disabled={busy||sent||!config||(config.enabled&&!token)}>{sent?'需求已提交':busy?'正在送出…':config?.enabled?'啟動增長引擎':'整理需求，透過 Email 聯繫'} <span><Arrow direction="up-right"/></span></button>
 <small>{config?.enabled?'送出後由九色鹿團隊接收並回覆。':'線上寄送尚未開放。可先整理需求，再透過 Email 或 LINE 聯繫。'}</small>
 <div role="status" aria-live="polite">{notice&&<p className="contact-status">{notice}</p>}{summary&&<section className="contact-summary"><h2>合作需求已整理</h2><p>尚未寄送。點擊下方按鈕開啟您的郵件程式，確認後寄出；若無法開啟，請複製內容寄至 info@ninedr.com。</p><pre>{summary}</pre><a className="text-link" href={'mailto:info@ninedr.com?cc=cathy%40ninedr.com%2Csteven%40ninedr.com&subject='+encodeURIComponent('九色鹿官網合作諮詢')+'&body='+encodeURIComponent(summary)}>開啟 Email 寄送 <Arrow direction="up-right"/></a></section>}</div>
 </form>
}
