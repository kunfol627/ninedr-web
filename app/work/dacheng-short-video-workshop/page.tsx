import Arrow from '@/app/arrow';
import ImagePreview from '../cardcaptor-sakura-yinsheng/image-preview';
import './workshop.css';
export const metadata = {
 title:'大誠保經 全民通訊處｜企業內訓・短影音工作坊',
 description:'九色鹿為大誠保經 全民通訊處帶來短影音工作坊，從帳號定位、內容方向到鏡頭表現與剪輯，分享企業團隊運用短影音的思考與方法。',
 alternates:{canonical:'/work/dacheng-short-video-workshop'},
 openGraph:{title:'大誠保經 全民通訊處｜企業內訓・短影音工作坊',description:'從帳號定位到鏡頭表現與剪輯，九色鹿企業內訓與短影音工作坊紀錄。',images:[{url:'/images/cases/dacheng-workshop/group.webp',width:2048,height:1536}]}
};
const images = [{"src": "/images/cases/dacheng-workshop/group.webp", "width": 2048, "height": 1536, "alt": "大誠保經 全民通訊處短影音工作坊團體合照"}, {"src": "/images/cases/dacheng-workshop/classroom.webp", "width": 2048, "height": 1536, "alt": "短影音工作坊課堂講解與學員參與"}, {"src": "/images/cases/dacheng-workshop/teaching.webp", "width": 1536, "height": 2048, "alt": "講師分享短影音內容定位與品牌記憶"}, {"src": "/images/cases/dacheng-workshop/appreciation.webp", "width": 1536, "height": 2048, "alt": "短影音工作坊感謝狀合影"}];
export default function Page(){return <main id="main" className="page section project-editorial workshop-case">
 <nav className="project-breadcrumb" aria-label="麵包屑"><a href="/work">合作案例</a><span>/</span><span>企業內訓</span></nav>
 <p className="eyebrow">CORPORATE TRAINING / SHORT VIDEO WORKSHOP</p>
 <h1>大誠保經 全民通訊處<br/><span className="muted">企業內訓／短影音工作坊</span></h1>
 <div className="project-overview"><div><p className="eyebrow">ABOUT THE PROJECT</p><h2>從專業出發，找到短影音的內容方向。</h2><p>九色鹿為大誠保經 全民通訊處帶來短影音工作坊，以「從帳號定位到鏡頭表現與剪輯」為主題，分享內容規劃與影像表達的方法，陪伴企業團隊思考如何透過短影音傳遞專業。</p></div><dl><div><dt>CLIENT / 合作單位</dt><dd>大誠保經 全民通訊處</dd></div><div><dt>PROJECT / 合作項目</dt><dd>企業內訓／短影音工作坊</dd></div><div><dt>FOCUS / 課程主題</dt><dd>帳號定位、內容方向、鏡頭表現與剪輯</dd></div></dl></div>
 <section className="project-gallery" aria-label="工作坊活動照片"><div className="gallery-heading"><p className="eyebrow">WORKSHOP HIGHLIGHTS</p><h2>課堂交流與活動紀錄</h2></div><div className="workshop-gallery">{images.map((im,i)=><figure key={im.src}><ImagePreview {...im} label={'大誠保經短影音工作坊照片 '+(i+1)}/><figcaption>{im.alt} · 點擊放大預覽</figcaption></figure>)}</div></section>
 <div className="project-end"><a href="/work" className="text-link"><Arrow direction="left"/> 返回合作案例</a><a href="/contact" className="lime-button">洽詢企業內訓與短影音工作坊 <Arrow direction="up-right"/></a></div>
 </main>}
