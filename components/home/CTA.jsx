import { MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-28 px-6 bg-[#2D302A] text-center">
      <div className="max-w-2xl mx-auto bg-[#F7F5F0] rounded-[2rem] p-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#2C2A28] mb-6 tracking-widest">立即啟動對話</h2>
        <a 
          href="https://line.me/R/ti/p/@211snphq" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#06C755] text-white px-10 py-4 rounded-full flex items-center justify-center gap-3 mx-auto shadow-lg shadow-[#06C755]/20 hover:bg-[#05B34C] transition-colors"
        >
          <MessageCircle size={20} /> 加入 LINE 官方帳號
        </a>
        <p className="text-xs text-[#A6A298] mt-6 tracking-widest">LINE ID: @211snphq</p>
      </div>
    </section>
  );
}