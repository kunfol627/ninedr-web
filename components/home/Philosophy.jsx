'use client';
import React from 'react';

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 bg-[#F7F5F0]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* 標題字級與段落一致 */}
          <div className="mb-12 space-y-2">
            <h2 className="text-lg md:text-xl font-serif-tc font-bold text-[#2C2A28] tracking-widest leading-relaxed">
              以數據為大腦、視覺為語言
            </h2>
            <h2 className="text-lg md:text-xl font-serif-tc font-bold text-[#D0A9A0] tracking-widest leading-relaxed">
              我們是品牌業績的推手
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-[#706D67] leading-relaxed tracking-widest">
              九色鹿不僅是影像的創作者，更是品牌業績的推手。
            </p>
            {/* 🌟 修正後的服務描述：在手機與桌機版均強制斷行 */}
            <div className="text-lg md:text-xl text-[#706D67] font-medium tracking-widest bg-[#D0A9A0]/5 py-6 px-10 rounded-2xl inline-block">
              <p>涵蓋品牌視覺與企業形象包裝、</p>
              <p className="mt-2">內容與廣告全方位整合服務。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;