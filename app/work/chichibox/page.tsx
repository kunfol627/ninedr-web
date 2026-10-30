import Arrow from '@/app/arrow';
import ImagePreview from '../cardcaptor-sakura-yinsheng/image-preview';
import './case.css';
export const metadata = {
 title:'吃吃盒｜圖文與影音貼文',
 description:'吃吃盒社群內容合作案例：圖文貼文曝光次數 242,741、互動率 11%；影音貼文觸及人數 6,304、互動率 2%。',
 alternates:{canonical:'/work/chichibox'},
 openGraph:{title:'吃吃盒｜圖文與影音貼文',description:'圖文貼文曝光 242,741、互動率 11%；影音貼文觸及 6,304、互動率 2%。',images:[{url:'/images/cases/chichibox/product-1.jpg',width:1080,height:720}]}
};
const images = [{"src": "/images/cases/chichibox/product-1.jpg", "width": 1080, "height": 720, "alt": "吃吃盒盛裝沙拉、水果與餐點的餐桌情境"}, {"src": "/images/cases/chichibox/product-2.jpg", "width": 1080, "height": 720, "alt": "吃吃盒於辦公桌上的午餐情境"}, {"src": "/images/cases/chichibox/product-3.jpg", "width": 1080, "height": 831, "alt": "吃吃盒盛裝餐點與水果的產品情境"}, {"src": "/images/cases/chichibox/product-4.jpg", "width": 1080, "height": 720, "alt": "吃吃盒透明盒身與多色上蓋展示"}, {"src": "/images/cases/chichibox/product-5.jpg", "width": 1080, "height": 720, "alt": "吃吃盒多色盒身與上蓋展示"}];
const results = [
 {title:'圖文貼文',en:'PHOTO POSTS',metrics:[['242,741','IMPRESSIONS','曝光次數'],['11%','ENGAGEMENT RATE','互動率']]},
 {title:'影音貼文',en:'VIDEO POSTS',metrics:[['6,304','REACH','觸及人數'],['2%','ENGAGEMENT RATE','互動率']]}
];
export default function Page(){return <main id="main" className="page section project-editorial chichibox-case">
 <nav className="project-breadcrumb" aria-label="麵包屑"><a href="/work">合作案例</a><span>/</span><span>社群內容</span></nav>
 <p className="eyebrow">SOCIAL CONTENT / BRAND STORY</p>
 <h1>吃吃盒<br/><span className="muted">圖文與影音貼文</span></h1>
 <div className="project-overview"><div><p className="eyebrow">ABOUT THE PROJECT</p><h2>讓產品，走進日常畫面。</h2><p>以圖文與影音貼文呈現吃吃盒的品牌內容，從餐桌到辦公桌，展示產品在日常生活中的不同情境。</p></div><dl><div><dt>CLIENT / 合作品牌</dt><dd>吃吃盒</dd></div><div><dt>PROJECT / 合作項目</dt><dd>圖文貼文、影音貼文</dd></div></dl></div>
 <section className="project-results" aria-label="社群貼文成果"><p className="eyebrow">PROJECT RESULTS / 專案成果</p><div className="post-results">{results.map(group=><section key={group.en} aria-label={group.title+'成果'}><h2>{group.title}</h2><p className="eyebrow">{group.en}</p><div className="result-grid">{group.metrics.map(([value,en,label])=><div key={en}><strong>{value}</strong><span>{en}</span><small>{label}</small></div>)}</div></section>)}</div><p className="result-source">成果數據由九色鹿提供。圖文與影音貼文分別呈現曝光次數與觸及人數。</p></section>
 <section className="project-gallery" aria-label="吃吃盒產品情境照片"><div className="gallery-heading"><p className="eyebrow">PROJECT GALLERY</p><h2>產品與生活情境</h2></div><div className="chichibox-gallery">{images.map((im,i)=><figure key={im.src}><ImagePreview {...im} label={'吃吃盒產品情境照片 '+(i+1)}/><figcaption>{im.alt} · 點擊放大預覽</figcaption></figure>)}</div></section>
 <div className="project-end"><a href="/work" className="text-link"><Arrow direction="left"/> 返回合作案例</a><a href="/contact" className="lime-button">討論你的社群內容專案 <Arrow direction="up-right"/></a></div>
 </main>}
