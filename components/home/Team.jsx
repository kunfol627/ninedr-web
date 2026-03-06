'use client';
import React from 'react';
import { Mail } from 'lucide-react';

const teamMembers = [
  {
    name: '宋雅欣',
    title: 'Cathy Sung',
    specialty: 'Co-Founder',
    slogan: '「洞悉人性的品牌操盤手」',
    description: '擁有深厚的廣告投放與行銷戰略背景，深諳現代消費者的心理學與市場脈動。協助品牌將視覺資產轉化為實質業績動能。',
    image: '/images/founder01.png',
  },
  {
    name: '謝清鴻',
    title: 'Steven Hsieh',
    specialty: 'DIRECTOR',
    slogan: '「跨領域行銷專家」',
    description: '超過 15 年數位內容與行銷實務底蘊，精通短影音敘事邏輯與視覺美學，協助品牌在碎片化時代建立絕對優勢。',
    image: '/images/director01.png',
  }
];

const Team = () => {
  return (
    <section id="team" className="py-24 bg-[#2C2A28] text-[#F7F5F0]">
      <div className="container mx-auto px-6 text-center">
        {/* 🌟 統一標題大小 */}
        <h2 className="text-4xl md:text-5xl font-serif-tc font-bold text-[#D0A9A0] mb-20 tracking-widest">
          核心顧問團隊
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto text-left">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-[#363330] p-10 rounded-2xl flex flex-col sm:flex-row items-center gap-8 border border-[#45413D]">
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl flex-shrink-0 bg-[#2C2A28]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-3xl font-serif-tc font-bold text-[#D0A9A0] mb-1">{member.name}</h3>
                <p className="text-lg font-medium text-[#F7F5F0] mb-1">{member.title}</p>
                <p className="text-sm text-[#D2CFC9] mb-4">{member.specialty}</p>
                <p className="text-lg font-medium text-[#D0A9A0] italic mb-4 font-serif-tc">{member.slogan}</p>
                <p className="text-[#D2CFC9] text-sm leading-relaxed mb-6">{member.description}</p>
                <a href="mailto:info@ninedr.com" className="inline-flex items-center gap-2 text-[#F7F5F0] hover:text-[#D0A9A0] transition-colors underline decoration-[#D0A9A0] underline-offset-4">
                  <Mail size={16} /> 預約顧問諮詢
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;