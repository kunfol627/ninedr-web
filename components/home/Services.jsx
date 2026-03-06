'use client';
import React from 'react';
import { Megaphone, TrendingUp, Target, PenTool } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="w-8 h-8" />,
    title: '品牌識別升級',
    desc: '我們將純粹的設計美學與敏銳的商業思維深度結合。從標誌設計（LOGO）、品牌標準字到企業形象的全面包裝，為您的企業注入獨特的品牌故事。',
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: '內容產製與行銷傳播',
    desc: '用好故事，圈對的粉。精準掌握短影音與圖文的全通路佈局，我們超越傳統的廣告推播，專注於深度的社群互動與營運，為您的品牌培養出忠誠度極高的超級鐵粉。',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: '數據驅動廣告投放',
    desc: ' 我們捨棄直覺式的盲目投放，以嚴謹的數據追蹤為基底，持續測試並優化廣告策略。將專屬的品牌視覺資產效益最大化，精準鎖定目標受眾，創造具體營收成長。',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: '行銷顧問整合服務',
    desc: '作為企業的外部戰略夥伴，提供全方位行銷方案，從市場洞察到落地執行一站式解決。',
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white text-[#2C2A28]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[#D0A9A0] font-medium tracking-[0.3em] mb-4 text-sm uppercase">Our Services</p>
          {/* 🌟 統一標題大小 */}
          <h2 className="text-3xl md:text-5xl font-serif-tc font-bold tracking-wider leading-tight">
            從零打造品牌的核心
          </h2>
          <div className="w-20 h-1 bg-[#D0A9A0] mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-6 bg-[#F7F5F0] rounded-full text-[#D0A9A0] group-hover:bg-[#D0A9A0] group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif-tc font-bold mb-4">{service.title}</h3>
              <p className="text-[#706D67] leading-relaxed text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;