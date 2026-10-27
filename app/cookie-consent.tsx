'use client';
import {useEffect,useRef,useState} from 'react';
import './cookie-consent.css';
import {CONSENT_KEY as key,readPreference} from '../lib/analytics.mjs';
export default function CookieConsent(){
 const [visible,setVisible]=useState(false),[settings,setSettings]=useState(false),[analytics,setAnalytics]=useState(false);
 const panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{const saved=readPreference(localStorage);if(saved){setAnalytics(saved.analytics)}else setVisible(true)}catch{setVisible(true)}const reopen=()=>{setSettings(true);setVisible(true);requestAnimationFrame(()=>panel.current?.focus())};const expired=()=>{setAnalytics(false);setVisible(true)};window.addEventListener('ninedr-consent-expired',expired);window.addEventListener('ninedr-cookie-settings',reopen);return()=>{window.removeEventListener('ninedr-cookie-settings',reopen);window.removeEventListener('ninedr-consent-expired',expired)}},[]);
 function save(value:boolean){const preference={analytics:value,at:Date.now()};try{localStorage.setItem(key,JSON.stringify(preference))}catch{}setAnalytics(value);setVisible(false);setSettings(false);window.dispatchEvent(new CustomEvent('ninedr-consent-change',{detail:preference}))}
 if(!visible)return null;
 return <div className="cookie-notice" ref={panel} tabIndex={-1} role="region" aria-label="Cookie 與隱私設定"><div className="cookie-copy"><p className="cookie-title">您的隱私，由您決定。</p><p>本網站使用必要的儲存功能，記住您的偏好。若您接受，我們會使用 Google Analytics 4 分析瀏覽及聯繫互動，協助改善網站。僅必要項目不會啟用分析追蹤。</p><a href="/privacy">Privacy Policy／隱私政策</a>{settings&&<div className="cookie-options"><p>必要項目：維持網站功能、保護表單及記錄您的隱私選擇，持續啟用。</p><label><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/>允許網站互動分析（Google Analytics 4）</label><p>選擇保存在此瀏覽器 180 天；您可隨時從頁尾「Cookie 設定」變更。</p></div>}</div><div className="cookie-actions"><button type="button" onClick={()=>setSettings(!settings)} aria-expanded={settings}>{settings?'收合設定':'設定'}</button><button type="button" onClick={()=>save(false)}>僅必要項目</button><button className="cookie-accept" type="button" onClick={()=>save(settings?analytics:true)}>{settings?'儲存選擇':'接受'}</button></div></div>
}
