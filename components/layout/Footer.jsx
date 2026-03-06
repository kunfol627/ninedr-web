'use client';
import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-[#2C2A28] text-[#F7F5F0] pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-b border-[#45413D] pb-16">
          <div>
            <img src="/images/NINEDR_2023LOGO_白.png" alt="ninedr" className="h-12 mb-8" />
            {/* 🌟 調整為指定的兩行描述分行 */}
            <div className="text-[#D2CFC9] text-lg leading-relaxed tracking-widest">
              <p>懂視覺，更懂人心的品牌推手。</p>
              <p>協助企業從零打造具備高轉化能力的品牌核心。</p>
            </div>
          </div>
          <div className="flex md:justify-end items-center">
            <a href="mailto:info@ninedr.com" className="flex items-center gap-3 text-2xl hover:text-[#D0A9A0] transition-colors group">
              <Mail className="group-hover:scale-110 transition-transform" /> 
              info@ninedr.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#D2CFC9] tracking-widest">
            © 2026 九色鹿有限公司 ninedr.Co.Ltd All rights reserved.
          </p>
          <div className="flex gap-8 items-center">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-sm text-[#D2CFC9] hover:text-[#D0A9A0] transition-colors underline underline-offset-4"
            >
              隱私政策
            </button>
            <a href="https://line.me/R/ti/p/@211snphq" target="_blank" rel="noopener noreferrer" className="text-sm text-[#D2CFC9] hover:text-[#D0A9A0]">
              LINE 官方帳號
            </a>
          </div>
        </div>
      </div>

      {/* 隱私政策彈窗 (文字已補齊) */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#F7F5F0] text-[#2C2A28] max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-8 relative shadow-2xl custom-scrollbar">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-4 right-4 p-2 hover:bg-[#D0A9A0]/20 rounded-full">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-serif-tc font-bold text-[#D0A9A0] mb-8">隱私政策與個資保護聲明</h2>
            <div className="space-y-6 text-[#706D67] text-sm leading-relaxed">
              <p>最後更新日期：2026年3月4日</p>
              <section>
                <h3 className="font-bold text-[#2C2A28] mb-2 text-base">一、資料蒐集之目的</h3>
                <p>九色鹿有限公司（以下簡稱本公司）蒐集您的個人資料，目的在於進行品牌諮詢服務、行銷活動通知及合約履行。我們承諾僅在上述目的範圍內使用您的個人資料。</p>
              </section>
              <section>
                <h3 className="font-bold text-[#2C2A28] mb-2 text-base">二、蒐集之資料類別</h3>
                <p>我們可能蒐集的資料包括：姓名、聯繫電話、電子郵件地址、公司名稱及職稱等商務聯絡資訊。</p>
              </section>
              <section>
                <h3 className="font-bold text-[#2C2A28] mb-2 text-base">三、利用期間與方式</h3>
                <p>您的資料將於業務存續期間內，以數位或紙本形式由本公司妥善保存。除非經法律強制要求或取得您的書面同意，我們絕不會將資料提供給任何第三方。</p>
              </section>
              <p className="pt-4 border-t border-[#D2CFC9] italic text-xs">如有任何疑問，請聯繫本公司：info@ninedr.com</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;