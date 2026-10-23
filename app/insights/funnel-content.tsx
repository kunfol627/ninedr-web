'use client';
import {useEffect,useRef} from 'react';
import {funnelBody} from '../../content/funnel-body';
import {calculateFunnel} from '../../lib/funnel-calculator.mjs';

export default function FunnelContent(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=ref.current;if(!root)return;
  const all=<T extends HTMLElement>(s:string)=>Array.from(root.querySelectorAll<T>(s));
  const tabs=all<HTMLButtonElement>('[data-tab]');
  const panels=all<HTMLElement>('.stage-panel');
  const stage=(n:number)=>{tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1});panels.forEach((p,i)=>{p.hidden=i!==n;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','tab-'+i);p.tabIndex=0})};
  const cleanup:Array<()=>void>=[];
  function listen(el:HTMLElement,event:string,fn:EventListener){el.addEventListener(event,fn);cleanup.push(()=>el.removeEventListener(event,fn))}
  tabs.forEach((b,i)=>{listen(b,'click',()=>stage(i));listen(b,'keydown',e=>{const key=(e as KeyboardEvent).key;if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;e.preventDefault();const n=key==='Home'?0:key==='End'?5:(i+(key==='ArrowRight'?1:5))%6;stage(n);tabs[n].focus()})});stage(0);
  const cases=all<HTMLButtonElement>('[data-case]');
  const casePanels=all<HTMLElement>('#caseContent,#caseContentB2B');
  const pick=(n:number)=>{cases.forEach((b,i)=>{b.classList.toggle('active',i===n);b.setAttribute('aria-pressed',String(i===n))});casePanels.forEach((p,i)=>p.hidden=i!==n)};
  cases.forEach((b,i)=>listen(b,'click',()=>pick(i)));pick(0);
  const inputs=all<HTMLInputElement>('.fields input');
  function calc(){const values=calculateFunnel(inputs.map(x=>x.value));Object.entries(values).forEach(([id,value])=>{const el=root!.querySelector('#'+id);if(el)el.textContent=String(value)})}
  inputs.forEach(x=>listen(x,'input',calc));calc();root.classList.add('enhanced');
  return()=>{cleanup.forEach(fn=>fn());panels.forEach(p=>p.hidden=false);casePanels.forEach(p=>p.hidden=false);root.classList.remove('enhanced')};
 },[]);
 return <div ref={ref} className="funnel-article" dangerouslySetInnerHTML={{__html:funnelBody}}/>;
}
