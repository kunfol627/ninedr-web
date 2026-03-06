'use client';
import React from 'react';

const steps = [
  { 
    no: '1', 
    title: '輔導', 
    desc: '零基礎，跨出數位行銷第一步。透過架構性引導，協助您選擇最適合企業發展的道路。' 
  },
  { 
    no: '2', 
    title: '選擇', 
    desc: '在多元社群平台中，精準判斷如何選擇？找出最能吸引目標顧客族群的核心陣地。' 
  },
  { 
    no: '3', 
    title: '規劃', 
    desc: '制定網路帳號經營策略。包含清晰的人設定位、精準的標題鉤子，以及具備吸引力的主題內容。' 
  },
  { 
    no: '4', 
    title: '整合', 
    desc: '整合全通路行銷資源。透過工具模組化管理，顯著提高品牌經營的效率。' 
  }
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-[#F7F5F0]">
      <div className="container mx-auto px-6 text-center">
        {/* 🌟 根據新附件調整的統一標題與副標 */}
        <p className="text-[#D0A9A0] font-medium tracking-[0.3em] mb-4 text-sm uppercase">Consulting Service</p>
        <h2 className="text-3xl md:text-5xl font-serif-tc font-bold tracking-wider leading-tight mb-6 text-[#2C2A28]">
          專業顧問服務
        </h2>
        <div className="w-20 h-1 bg-[#D0A9A0] mx-auto mb-20"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-2xl shadow-lg border border-transparent hover:border-[#D0A9A0] transition-all duration-300 group"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-[#D0A9A0] tracking-widest uppercase mb-2">Step</span>
                <div className="w-16 h-16 bg-[#F7F5F0] text-[#2C2A28] rounded-full flex items-center justify-center text-3xl font-bold mb-6 group-hover:bg-[#D0A9A0] group-hover:text-white transition-colors duration-300">
                  {step.no}
                </div>
                <h3 className="text-2xl font-serif-tc font-bold mb-4 text-[#2C2A28]">{step.title}</h3>
                <div className="w-8 h-0.5 bg-[#D2CFC9] mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-[#706D67] text-sm leading-relaxed tracking-wider">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;