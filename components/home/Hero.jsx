'use client';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-36 pb-32 px-6 min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#D0A9A0]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#8A9A92]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="absolute left-6 md:left-12 top-1/3 vertical-text text-xs tracking-[0.3em] text-[#A6A298] hidden sm:block">
        DATA-DRIVEN STRATEGY
      </div>

      <div className="mb-12 md:mb-16 relative z-10">
        {/* 修正 1：在此處植入高轉換標語，取代原本較單調的英文 */}
        <span className="text-xs md:text-sm tracking-[0.2em] text-[#8A9A92] border-b border-[#8A9A92]/30 pb-3 whitespace-nowrap font-medium">
          從零打造品牌 ｜ 影音製作 ｜ 數據驅動行銷
        </span>
      </div>

      <h1 className="text-[clamp(1.75rem,7.5vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-[#2C2A28] leading-[1.6] mb-10 md:mb-14 tracking-[0.1em] relative z-10 whitespace-nowrap">
        懂視覺，更懂人心的<br />
        <span className="text-[#D0A9A0] relative inline-block mt-2 md:mt-4">
          品牌推手
          <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-[#D0A9A0]/20 -z-10"></span>
        </span>
      </h1>
      
      <p className="text-[clamp(0.875rem,4vw,1rem)] md:text-lg text-[#706D67] mb-16 md:mb-20 max-w-xl relative z-10 font-light tracking-wide leading-loose whitespace-nowrap">
        從「曝光」到「轉換」的無縫接軌，<br />以理性數據驅動，讓感性視覺發聲。
      </p>

      {/* 修正 5：使用標準的 button 標籤 */}
      <button 
        onClick={() => scrollToSection('cta')} 
        className="relative z-10 bg-[#2C2A28] text-[#F7F5F0] text-sm tracking-widest px-10 py-4 md:px-12 md:py-5 rounded-full flex items-center gap-4 hover:bg-[#4A4742] transition-colors shadow-xl shadow-[#2C2A28]/10 group"
      >
        開啟專屬策略 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* 往下指引的裝飾線條 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 md:h-32 bg-gradient-to-b from-[#D0A9A0]/50 to-transparent"></div>
    </section>
  );
}