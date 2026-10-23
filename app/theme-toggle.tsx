'use client';
import {useEffect,useState} from 'react';

export default function ThemeToggle(){
 const [light,setLight]=useState(false);
 useEffect(()=>{setLight(document.documentElement.dataset.theme==='light')},[]);
 const toggle=()=>{const next=!light;document.documentElement.dataset.theme=next?'light':'dark';setLight(next);try{sessionStorage.setItem('ninedr-theme',next?'light':'dark')}catch{}const url=new URL(location.href);url.searchParams.set('theme',next?'light':'dark');history.replaceState(null,'',url);window.dispatchEvent(new Event('ninedr-theme-change'))};
 return <button type="button" className="theme-toggle" onClick={toggle} aria-label={light?'切換為深色版':'切換為淺色版'} title={light?'切換為深色版':'切換為淺色版'}><svg viewBox="0 0 24 24" aria-hidden="true">{light?<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/>:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>}</svg><span>{light?'深色版':'淺色版'}</span></button>
}
