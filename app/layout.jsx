import './globals.css'; 

export const metadata = {
  title: "九色鹿 ninedr | 從零打造品牌 ｜ 影音製作 ｜ 數據驅動行銷",
  description: "我們是懂視覺，更懂人心的品牌推手。提供從零打造品牌、高質感影音內容產製，到數據驅動廣告行銷的全方位整合服務。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className="min-h-screen bg-[#F7F5F0] text-[#706D67] font-serif-tc selection:bg-[#D0A9A0]/30 selection:text-[#2C2A28]">
        {children}
      </body>
    </html>
  );
}