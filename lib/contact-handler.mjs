const origins = new Set(['https://www.ninedr.com', 'https://ninedr-vosio-minimal.milkyfrost129.chatgpt.site']);
const directions = new Set(['整合行銷','廣告投放與媒介操作','廣告創意與內容產製','品牌策略與整合行銷','SEO / GEO / Local SEO','品牌設計','企業顧問與數位轉型','其他合作']);
const json = (body, status = 200) => Response.json(body, {status, headers:{'Cache-Control':'no-store'}});
const configured = value => typeof value === 'string' && value.trim().length > 0;
const hasEmailBinding = env => typeof env.EMAIL?.send === 'function';
// Configuration presence only: domain verification and delivery require acceptance testing.
const ready = env => env.CONTACT_ENABLED === 'true' &&
  (hasEmailBinding(env) || configured(env.RESEND_API_KEY)) &&
  [env.CONTACT_FROM, env.TURNSTILE_SITE_KEY, env.TURNSTILE_SECRET_KEY].every(configured);

// Fixed server-side recipients; visitors cannot redirect form submissions.
export async function handleContact(request, env, transport = fetch) {
  if(request.method === 'GET') return json({enabled:ready(env),siteKey:ready(env)?env.TURNSTILE_SITE_KEY:null});
  if(request.method !== 'POST') return json({error:'不支援此操作。'},405);
  const origin=request.headers.get('Origin');
  if(!origins.has(origin) && !(env.CONTACT_PREVIEW_ORIGIN && origin===env.CONTACT_PREVIEW_ORIGIN)) return json({error:'請由官方網站送出表單。'},403);
  if(!ready(env)) return json({error:'線上表單尚未開放，請透過 Email 或 LINE 聯繫我們。'},503);
  if(!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'資料格式不正確。'},415);
  // Bound the stream, including requests without Content-Length.
  const reader=request.body?.getReader();
  if(!reader) return json({error:'請填寫合作需求。'},400);
  let size=0;const chunks=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>24000){await reader.cancel();return json({error:'內容過長，請縮短後重試。'},413)}chunks.push(value)}
  let data;
  try{const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}data=JSON.parse(new TextDecoder().decode(bytes))}catch{return json({error:'資料格式不正確。'},400)}
  const validString=(v,max)=>typeof v==='string' && v.trim().length>0 && v.length<=max;
  if(!data || typeof data!=='object' || !validString(data.name,80) || !validString(data.company,100) || !validString(data.email,254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.name+data.company) || !directions.has(data.direction) || !validString(data.message,4000) || data.consent!==true || data.website || !validString(data.token,2048)) return json({error:'請確認必填欄位、電子郵件與驗證後再送出。'},400);
  if(data.phone!==undefined && (typeof data.phone!=='string' || data.phone.length>40 || /[\r\n]/.test(data.phone))) return json({error:'請確認手機號碼格式，或留白後送出。'},400);
  try{
    const verification=await transport('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:data.token}),signal:AbortSignal.timeout(10000)});
    const checked=await verification.json();
    if(!verification.ok || checked.success!==true || checked.action!=='contact' || checked.hostname!==new URL(origin).hostname) return json({error:'驗證已過期或未完成，請重新驗證後送出。'},400);
    const payload={from:env.CONTACT_FROM,to:['info@ninedr.com'],cc:['cathy@ninedr.com','steven@ninedr.com'],reply_to:data.email,subject:`【官網合作諮詢】${data.company.trim()}｜${data.direction}`,text:`九色鹿官網合作需求\n\n稱呼：${data.name.trim()}\n品牌／公司：${data.company.trim()}\n電子郵件：${data.email}\n手機號碼：${data.phone?.trim()||'未填寫'}\n合作方向：${data.direction}\n\n品牌願景：\n${data.message.trim()}\n\n已同意依隱私政策處理本次諮詢資料。`};
    if(hasEmailBinding(env)){
      const {reply_to,...message}=payload;
      const result=await env.EMAIL.send({...message,replyTo:reply_to});
      if(!result?.messageId) return json({error:'無法確認寄送結果，請透過 Email／LINE 聯繫我們。'},502);
    }else{
      const email=await transport('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
      if(!email.ok) return json({error:'寄送未完成，請稍後重試，或透過 Email／LINE 聯繫我們。'},502);
      const result=await email.json();
      if(!result.id) return json({error:'無法確認寄送結果，請透過 Email／LINE 聯繫我們。'},502);
    }
    return json({ok:true,message:'需求已提交，感謝您的來信。我們將透過您提供的 Email 聯繫您。'});
  }catch{return json({error:'目前無法確認寄送結果，請透過 Email／LINE 聯繫我們。'},502)}
}
