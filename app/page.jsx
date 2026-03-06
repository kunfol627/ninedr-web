'use client';
import { useState } from 'react';

// 匯入佈局元件
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrivacyModal from '@/components/ui/PrivacyModal';

// 匯入各個首頁區塊元件
import Hero from '@/components/home/Hero';
import Philosophy from '@/components/home/Philosophy';
import Services from '@/components/home/Services';
import MarketTrends from '@/components/home/MarketTrends';
import Process from '@/components/home/Process';
import Cases from '@/components/home/Cases';
import Team from '@/components/home/Team';
import CTA from '@/components/home/CTA';

export default function Home() {
  // 在最上層統一控管隱私權彈窗的開關狀態
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <main className="relative">
      {/* 頂部導覽列 */}
      <Navbar />

      {/* 隱私權彈窗 (將狀態與關閉函式傳入) */}
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />

      {/* 依序拼裝頁面主要內容區塊 */}
      <Hero />
      <Philosophy />
      <Services />
      <MarketTrends />
      <Process />
      <Cases />
      <Team />
      <CTA />

      {/* 頁尾 (將開啟彈窗的函式傳入) */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
    </main>
  );
}