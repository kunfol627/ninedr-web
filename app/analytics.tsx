'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {getAnalytics, readPreference, validPreference} from '../lib/analytics.mjs';
export default function Analytics(){
 const pathname=usePathname();
 useEffect(()=>{
  const analytics=getAnalytics();
  const sync=(event?:Event)=>{
   let saved=null;try{saved=readPreference(window.localStorage)}catch{}
   const value=event instanceof CustomEvent&&validPreference(event.detail)?event.detail:saved;
   analytics?.setConsent(value);
  };
  const click=(event:MouseEvent)=>{
   const anchor=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
   if(!event.defaultPrevented&&anchor)analytics?.contactClick(anchor.href,anchor.closest('footer')?'footer':anchor.closest('header')?'header':'content');
  };
  sync();window.addEventListener('ninedr-consent-change',sync);window.addEventListener('storage',sync);document.addEventListener('click',click);
  return()=>{window.removeEventListener('ninedr-consent-change',sync);window.removeEventListener('storage',sync);document.removeEventListener('click',click);analytics?.dispose();};
 },[]);
 useEffect(()=>{getAnalytics()?.pageView()},[pathname]);
 return null;
}
