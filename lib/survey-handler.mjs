const SURVEY_ORIGIN = 'https://ninedr-video-class-survey.kun-fol627.chatgpt.site';

export function handleSurvey(request) {
 const url = new URL(request.url);
 if (!url.pathname.startsWith('/survey')) return null;
 const match = /^\/survey\/class\/([ab])\/?$/.exec(url.pathname);
 if (!match) return null;
 if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
 const label = match[1].toUpperCase();
 const src = `${SURVEY_ORIGIN}/?class=${match[1]}`;
 const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><title>${label} 班｜短影音實戰班課前問卷・九色鹿</title><meta name="description" content="九色鹿短影音實戰班 ${label} 班課前調查問卷"><style>html,body{margin:0;width:100%;height:100%;background:#fff}iframe{display:block;width:100%;height:100vh;height:100dvh;border:0}</style></head><body><iframe src="${src}" title="${label} 班短影音課前問卷" referrerpolicy="strict-origin-when-cross-origin"></iframe><noscript>本問卷需要啟用 JavaScript 才能填寫。</noscript></body></html>`;
 return new Response(request.method==='HEAD'?null:html,{headers:{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex, follow','Cache-Control':'no-cache','Content-Security-Policy':`frame-src ${SURVEY_ORIGIN}; object-src 'none'; base-uri 'none'`}});
}
