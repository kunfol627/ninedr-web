import Arrow from '@/app/arrow';
import ImagePreview from './cardcaptor-sakura-yinsheng/image-preview';
import './video-series.css';
type Props = {name:string;impressions:string;engagement:string;images:{src:string;width:number;height:number;alt:string}[]};
export default function VideoSeriesCase({name,impressions,engagement,images}:Props){
 return <main id="main" className="page section project-editorial video-series-case">
  <nav className="project-breadcrumb" aria-label="麵包屑"><a href="/work">合作案例</a><span>/</span><span>系列影片</span></nav>
  <p className="eyebrow">VIDEO SERIES / BRAND CONTENT</p>
  <h1>{name}<br/><span className="muted">系列影片</span></h1>
  <div className="project-overview"><div><p className="eyebrow">ABOUT THE PROJECT</p><h2>以系列影片，呈現品牌內容。</h2><p>{name}系列影片合作，透過不同主題與畫面呈現品牌，以下展示系列成果及影片畫面。</p></div><dl><div><dt>CLIENT / 合作品牌</dt><dd>{name}</dd></div><div><dt>PROJECT / 合作項目</dt><dd>系列影片</dd></div></dl></div>
  <section className="project-results" aria-label="系列影片成果"><p className="eyebrow">PROJECT RESULTS / 專案成果</p><div className="result-grid">{[[impressions,'IMPRESSIONS','曝光次數'],[engagement,'ENGAGEMENT RATE','互動率']].map(([value,en,label])=><div key={en}><strong>{value}</strong><span>{en}</span><small>{label}</small></div>)}</div><p className="result-source">系列成果數據由九色鹿提供。</p></section>
  <section className="project-gallery" aria-label="系列影片畫面"><div className="gallery-heading"><p className="eyebrow">SERIES HIGHLIGHTS</p><h2>系列影片畫面</h2></div><div className="series-gallery">{images.map((im,i)=><figure key={im.src}><ImagePreview {...im} label={name+'系列影片畫面 '+(i+1)}/><figcaption>影片畫面 {String(i+1).padStart(2,'0')} · 點擊放大預覽</figcaption></figure>)}</div></section>
  <div className="project-end"><a href="/work" className="text-link"><Arrow direction="left"/> 返回合作案例</a><a href="/contact" className="lime-button">討論你的系列影片專案 <Arrow direction="up-right"/></a></div>
 </main>;
}
