
import Arrow from "@/app/arrow";
import Contact from './contact';
export const metadata={alternates:{canonical:'/contact'},title:'聯絡我們',description:'與九色鹿討論品牌策略、內容創意、數位公關與 AI 搜尋的合作需求。'};
export default function Page(){return <main id="main" className="page section"><p className="eyebrow">04 / START A CONVERSATION</p><h1 className="page-title">好的共鳴，<br/>從<span className="lime">對話</span>開始。</h1><div className="contact-layout"><div><h2>將您的品牌願景，<br/>輸入我們的運算核心中。</h2><p>告訴我們您正面對的挑戰，<br/>以及您想抵達的下一站。</p><div className="contact-direct"><a className="text-link" href="https://line.me/R/ti/p/%40800rczvx" target="_blank" rel="noopener noreferrer">LINE 官方帳號 <Arrow direction="up-right"/></a><a className="text-link" href="mailto:info@ninedr.com">info@ninedr.com <Arrow direction="up-right"/></a></div><p className="contact-note">從一個問題、一個想法開始，<br/>一起找到品牌的下一步。</p></div><Contact/></div></main>}
