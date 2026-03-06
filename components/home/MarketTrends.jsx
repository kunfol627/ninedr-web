export default function MarketTrends() {
  return (
    // 🌟 關鍵修正：加入 id="market-trends" 讓 Navbar 能正確跳轉
    <section id="market-trends" className="py-24 px-6 bg-[#2C2A28] text-[#F7F5F0]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-[#D0A9A0] tracking-[0.2em] mb-4 uppercase">MARKET TRENDS</p>
          {/* 🌟 統一標題字級與字體 */}
          <h2 className="text-3xl md:text-5xl font-serif-tc font-bold mb-8 tracking-widest leading-tight">
            為什麼是短影音？
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-10 rounded-2xl hover:bg-white/10 transition-colors text-center group">
            <h3 className="text-5xl font-bold text-[#D0A9A0] mb-6 group-hover:scale-110 transition-transform duration-500">3秒</h3>
            <h4 className="text-lg font-bold mb-4 tracking-widest">黃金鉤子效應</h4>
            <p className="text-sm text-white/60 font-light leading-loose text-left">
              現代人注意力短暫，前三秒決定完播率。我們具備強大的腳本策劃能力，打造吸睛開場，瞬間抓住目標客群眼球。
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 rounded-2xl hover:bg-white/10 transition-colors text-center group">
            <h3 className="text-5xl font-bold text-[#D0A9A0] mb-6 group-hover:scale-110 transition-transform duration-500">10X</h3>
            <h4 className="text-lg font-bold mb-4 tracking-widest">流量紅利快跟上</h4>
            <p className="text-sm text-white/60 font-light leading-loose text-left">
              相比傳統圖文貼文，短影音在各大平台的自然觸及與推薦演算法優勢高達十倍以上，能輕易突破同溫層限制。
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-10 rounded-2xl hover:bg-white/10 transition-colors text-center group">
            <h3 className="text-5xl font-bold text-[#D0A9A0] mb-6 group-hover:scale-110 transition-transform duration-500">80%</h3>
            <h4 className="text-lg font-bold mb-4 tracking-widest">轉換率大幅提升</h4>
            <p className="text-sm text-white/60 font-light leading-loose text-left">
              透過高互動性、真實感與沉浸式的影音體驗，能有效降低消費者的防備心，大幅提升品牌信任感與最終購買轉換。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}