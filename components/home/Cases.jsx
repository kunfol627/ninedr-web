import Image from 'next/image';
import { Check } from 'lucide-react';

export default function Cases() {
  return (
    <section id="cases" className="py-24 px-6 bg-[#F7F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-[#D0A9A0] tracking-[0.2em] mb-4">CASE STUDIES</p>
          <h2 className="text-3xl font-bold text-[#2C2A28] mb-8 tracking-widest">實戰案例解析</h2>
          <div className="w-12 h-px bg-[#E6E2D8] mx-auto"></div>
        </div>
        
        {/* 精選案例卡片 */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
          
          {/* 左側：視覺展示 (直式手機圖預留區) */}
          <div className="w-full md:w-5/12 lg:w-1/3 flex justify-center flex-shrink-0">
            <div className="group overflow-hidden rounded-[2rem] cursor-pointer relative aspect-[9/16] w-full max-w-[280px] bg-[#E6E2D8]/50 flex items-center justify-center shadow-lg border-[6px] border-white">
              {/* 模擬手機上方的瀏海裝飾 */}
              <div className="absolute top-0 inset-x-0 h-4 bg-white z-20 rounded-b-xl w-1/3 mx-auto"></div>
              
              {/* Next.js Image 優化版 */}
              <Image 
                src="/images/sample01.png" 
                alt="爆單房仲案例" 
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 relative z-10" 
              />
              
              <div className="absolute inset-0 bg-[#D0A9A0]/10 group-hover:bg-black/10 transition-colors duration-500 z-20 pointer-events-none"></div>
            </div>
          </div>

          {/* 右側：文字解析 */}
          <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-center">
            <p className="text-xs font-medium text-[#D0A9A0] tracking-[0.2em] mb-3">短影音製作 / 人設打造</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2C2A28] mb-4 tracking-widest">爆單房仲熱區</h3>
            
            <div className="inline-block bg-[#D0A9A0]/10 text-[#2C2A28] px-4 py-2 rounded-full text-sm font-bold tracking-widest mb-6 self-start">
              業績達成 1500萬 up
            </div>
            
            <p className="text-sm text-[#706D67] font-light leading-loose mb-8">
              將默默成交的經紀人，轉化為高關注的專業品牌。內容破圈三招：
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D0A9A0]/20 flex items-center justify-center text-[#D0A9A0] flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[#2C2A28] font-bold text-sm tracking-widest mb-1">強化視覺 (房源展示)</h4>
                  <p className="text-sm text-[#706D67] font-light leading-relaxed">利用全景拍攝與運鏡技巧呈現裝潢細節，提升觀看黏著度與實體帶看轉化率。</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D0A9A0]/20 flex items-center justify-center text-[#D0A9A0] flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[#2C2A28] font-bold text-sm tracking-widest mb-1">房產權威 (知識科普)</h4>
                  <p className="text-sm text-[#706D67] font-light leading-relaxed">經紀人專業講解購屋政策、貸款流程，拉高信任感並吸引精準買家關注。</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D0A9A0]/20 flex items-center justify-center text-[#D0A9A0] flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[#2C2A28] font-bold text-sm tracking-widest mb-1">客戶故事 (強化好感)</h4>
                  <p className="text-sm text-[#706D67] font-light leading-relaxed">紀錄真實帶看與成交案例，展現服務溫度，有效打動觀眾並提升客源轉介率。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}