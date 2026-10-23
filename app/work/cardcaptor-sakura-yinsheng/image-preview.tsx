'use client';
import {useRef} from 'react';
export default function ImagePreview({src="/images/sakura-nana-collaboration.webp",alt="一隻阿圓 Instagram 合作貼文截圖，分享 Vogue風格野餐日與庫洛魔法使：回憶鑰匙推廣內容",width=1096,height=808,label="一隻阿圓合作截圖"}:{src?:string;alt?:string;width?:number;height?:number;label?:string}){
 const dialog=useRef<HTMLDialogElement>(null);
 const picture=<img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async" draggable={false}/>;
 return <><button type="button" className="screenshot-link" aria-label={`放大預覽${label}`} onClick={()=>dialog.current?.showModal()}>{picture}</button><dialog ref={dialog} className="image-preview" aria-label={`${label}預覽`} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><button autoFocus className="preview-close" type="button" onClick={()=>dialog.current?.close()}>關閉 ×</button>{picture}</dialog></>;
}
