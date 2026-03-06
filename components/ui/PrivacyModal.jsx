'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  // 核心修復：背景滾動穿透 (Scroll Body Lock)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function 確保元件卸載時恢復正常
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[100] transition-visibility duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* 黑色遮罩 */}
      <div 
        className={`absolute inset-0 bg-[#2C2A28]/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* 面板主體 */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-2xl bg-[#F7F5F0] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* 面板頭部 */}
        <div className="flex justify-between items-center p-8 border-b border-[#E6E2D8]">
          <div>
            <h3 className="text-xl font-bold text-[#2C2A28] tracking-widest">隱私權保護政策</h3>
            <p className="text-xs text-[#8A9A92] mt-1 uppercase tracking-widest">Privacy Policy</p>
          </div>
          <button 
            onClick={onClose}
            aria-label="關閉隱私權政策"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#2C2A28] hover:bg-[#D0A9A0]/10 transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* 面板內容區 (將原本的 PrivacyContent 內容直接放進來) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="space-y-8 text-[#706D67] font-light leading-loose text-sm md:text-base">
            <p className="font-medium text-[#2C2A28]">非常歡迎您光臨「九色鹿有限公司網站」...</p>
            {/* ... 其餘隱私權條文 ... */}
          </div>
        </div>
      </div>
    </div>
  );
}