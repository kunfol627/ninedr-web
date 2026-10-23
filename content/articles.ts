// Only reviewed, published entries appear on the public index, detail pages and sitemap.
// Dates must be actual ISO dates. Sources should point to the original evidence.
export type Article = {
 slug:string; title:string; excerpt:string; category:'GEO 與搜尋'|'廣告與媒介'|'內容與品牌'|'整合行銷';
 status:'draft'|'published'; author:{name:string;bio:string;image?:string;kind?:'Person'|'Organization'};
 publishedAt:string; updatedAt:string; keywords:string[];
 cover?:{src:string;alt:string;width:number;height:number};
 takeaways?:string[];
 card?:{eyebrow:string;title:string;caption:string};
 cta?:{heading:string;highlight:string;text:string;label:string};
 sections:{id:string;heading:string;paragraphs:string[];bodyHtml?:string;cards?:{label:string;title:string;text:string}[];table?:{headers:string[];rows:string[][]};steps?:string[]}[];
 faqs:{question:string;answer:string}[];
 sources:{title:string;url:string}[];
 relatedServices:string[];
 seo:{title:string;description:string};
};
export const articles:Article[]=[
{
  "slug": "integrated-marketing-strategy",
  "title": "為什麼只做廣告或短影音還不夠？企業整合行銷策略解析",
  "excerpt": "從吸引注意到完成決策，解析 Meta 廣告、短影音、SEO 與 GEO 如何分工，協助企業找出值得優先投入的行銷工作。",
  "category": "整合行銷",
  "status": "published",
  "author": {
    "name": "九色鹿 Ninedr｜策略觀點",
    "kind": "Organization",
    "bio": "九色鹿團隊以數據洞察與視覺敘事，探索品牌、市場與消費者之間的連結。本文整合公開研究與策略分析，協助企業判斷行銷資源的投入順序。"
  },
  "publishedAt": "2026-10-23",
  "updatedAt": "2026-10-23",
  "keywords": [
    "整合行銷策略",
    "Meta 廣告",
    "短影音行銷",
    "SEO",
    "GEO",
    "顧客旅程"
  ],
  "takeaways": [
    "先辨識顧客的決策障礙，再決定渠道與內容的投入順序。",
    "廣告、短影音與搜尋內容分工協作，提供一致且可查證的資訊。",
    "以合格詢問、成交與貢獻毛利衡量成果，不以觀看或提及代替獲利。"
  ],
  "sections": [
    {
      "id": "perspective",
      "heading": "從單一接觸，走向完整決策。",
      "paragraphs": [],
      "bodyHtml": "<p>企業可以透過 Meta 廣告或短影音取得訂單，但當購買需要搜尋、比較與查證時，單一接觸點往往不足以支援完整決策。整合行銷的價值，在於讓廣告與短影音引發興趣，再以搜尋內容、官網案例及後續服務，協助顧客理解差異、降低疑慮並完成行動。</p><p>這不代表每家企業都應同時經營所有平台。對資源有限的團隊，更實際的起點是：找出顧客最容易停止前進的地方，再補足資訊與承接流程。</p><p>本文聚焦三個經營問題：單一渠道的限制在哪裡？SEO 與 GEO 可以補足什麼？企業應如何安排投資與衡量成效？</p>"
    },
    {
      "id": "paid-media",
      "heading": "為什麼企業不能長期只靠 Meta 廣告？",
      "paragraphs": [],
      "bodyHtml": "<p>Meta 廣告能協助企業快速觸及受眾、測試訴求與推動購買；若產品容易理解、交易風險低，平台內也可能完成成交。不過，當企業將主要獲客來源集中在同一平台，成長就更容易受到投放條件與承接能力的限制。</p><h3>廣告帶來接觸機會 後續資訊影響決策</h3><p>顧客點擊廣告後，可能仍想知道產品是否適用、費用包含什麼、與其他方案有何差異，以及出問題時如何處理。若承接頁面只有品牌口號與聯絡表單，這些疑問便沒有得到解答。</p><p>以企業設備採購為例，使用者可能被示範影片吸引，但採購與管理者還需要規格、相容性、交期和維修條件。這些資訊可以放在網站、平台商店或銷售資料中；重點是容易找到、清楚一致，並能支持實際評估。</p><h3>廣告預算增加 訂單未必等比例增加</h3><p>廣告成果取決於受眾、競價、創意、商品與成交流程。加碼可能觸及更多潛在客戶，也可能增加重複曝光，或接觸較難轉換的受眾。</p><p>因此，企業需要檢查新增預算帶來多少新增客戶與貢獻毛利。不能只用過去的平均 ROAS，推定下一筆投入仍有相同回報；也不應將個別投放變化解讀為所有產業的廣告成本必然持續上升。</p><h3>單一入口會集中營運風險</h3><p>平台政策、帳戶狀況與分發方式變動，都可能影響接單。建立官網內容、保存素材，以及經顧客同意建立聯繫方式，可以增加承接與跟進的自主性，但仍需維護與成本。</p><p><strong>經營判斷：</strong> 廣告成效下降時，先檢查商品、訴求、受眾、頁面與業務回覆。若真正障礙是價格或供貨，增加 SEO 文章並不會直接解決問題。</p>"
    },
    {
      "id": "short-video",
      "heading": "為什麼短影音觀看量高 詢問與訂單卻沒有增加？",
      "paragraphs": [],
      "bodyHtml": "<p>短影音的觀看量反映內容獲得注意，但不能單獨代表購買需求。影片吸引到誰、傳達什麼價值，以及觀看之後能否順利找到答案，都會影響商業成果。</p><h3>內容受歡迎 不代表受眾符合服務條件</h3><p>有趣的影片可能吸引大量非目標受眾。對只服務特定地區、企業規模或採購需求的品牌，觀看數增加不一定帶來合格詢問。</p><p>企業應同時追蹤相關受眾的互動、有效到站、合格詢問與成交品質，並檢查影片承諾與實際服務是否一致。</p><h3>單支短片未必足以回答完整採購問題</h3><p>短片適合示範操作、呈現情境、解釋單一觀念與建立熟悉感。但高單價、客製化或需要多人決策的服務，還需要可回查的比較資訊與證據。</p><p>例如，30 秒影片可以展示 AI 自動化的操作，企業評估導入時仍可能需要了解資料如何處理、系統如何串接、費用如何計算，以及哪些工作不適合自動化。</p><p>短影音本身也可以被搜尋並持續帶來曝光。企業需要判斷的是：現有內容是否足夠，以及有興趣的人能否找到合理的下一步。</p><h3>缺少承接與跟進 興趣便難以延續</h3><p>觀看後的下一步可以是查閱案例、選擇商品、詢問規格或預約評估。不同任務需要不同頁面，不宜把所有內容一律導向首頁。</p><p>若每次發布都重新製作，卻沒有保存腳本、逐字稿與原始證據，團隊也容易承受持續產出的壓力。將同一份研究改編為影片、比較頁與業務資料，可以減少重工；各形式仍須依閱讀情境重新編輯。</p>"
    },
    {
      "id": "seo",
      "heading": "SEO 如何承接廣告與短影音帶來的搜尋需求？",
      "paragraphs": [],
      "bodyHtml": "<p>SEO（搜尋引擎最佳化）協助企業改善網站在自然搜尋中的可發現性。當顧客開始搜尋選型、費用、評價與適用條件時，相關內容便有機會支援更深入的評估。</p><p>Google 與 The Behavioural Architects 的研究，以「messy middle」描述購買前在探索與評估之間往返的狀態。<a href=\"#source-1\" aria-label=\"參考資料 1\">[1]</a> 對企業的啟示是：首次接觸與最後成交之間，可能存在多次查詢、比較與討論。</p><p>假設一位主管先看到企業培訓短片，之後搜尋「企業 AI 課程如何選擇」。若品牌網站能清楚說明適用對象、課程方法、前置需求與成果限制，就能提供比單一宣傳訊息更完整的判斷依據。這是情境示例，並非實際客戶旅程統計。</p><h3>優先回答接近購買決策的問題</h3><p>可從業務與客服反覆收到的問題開始：</p><ul><li>這項服務適合哪些企業？哪些情況不適合？</li><li>費用受哪些因素影響？服務範圍包含什麼？</li><li>與替代方案相比，差異和限制是什麼？</li><li>導入需要哪些準備？交付與驗收如何進行？</li><li>有哪些可查證的案例與成果條件？</li></ul><p>這些問題是否具有搜尋需求，仍應用 Search Console、關鍵字研究與顧客訪談確認。SEO 不保證排名，也不代表所有搜尋流量都接近成交。</p><p>了解九色鹿的<a href=\"/services#seo-geo\">SEO 與 GEO 服務</a>。</p>"
    },
    {
      "id": "geo",
      "heading": "GEO 是什麼？與 SEO 有什麼關係？",
      "paragraphs": [],
      "bodyHtml": "<p>GEO（Generative Engine Optimization，生成式引擎最佳化）是業界用來描述改善生成式 AI 搜尋可見度的稱呼，關注品牌或內容是否被理解、提及與引用。</p><p>Google 官方文件指出，SEO 基礎仍適用其 AI Overviews 與 AI Mode，無須為這些功能另做特殊優化。<a href=\"#source-2\" aria-label=\"參考資料 2\">[2]</a><a href=\"#source-3\" aria-label=\"參考資料 3\">[3]</a> 這項說明適用於 Google Search，不能直接推定所有 AI 平台採取相同機制。</p><h3>企業應先改善內容的明確性與可查證性</h3><p>實務上，可先清楚呈現服務對象、適用條件、規格、作者、資料日期與原始依據，並維持各頁面的品牌資訊一致。比較內容應寫明比較基準，數據則交代樣本、期間與限制。</p><p>這些做法能提升資訊品質，但不是保證 AI 引用的公式。某段 FAQ、特定標記或固定文章長度，都不應被當成必然獲得推薦的承諾。</p><h3>被 AI 提及 不等於帶來流量或成交</h3><p>Pew Research Center 分析 900 位美國成年人在 2025 年 3 月的瀏覽資料，發現出現 AI 摘要的 Google 搜尋造訪中，8% 點擊傳統結果；沒有摘要時為 15%。<a href=\"#source-5\" aria-label=\"參考資料 5\">[5]</a></p><p>這是特定地區、樣本與期間的觀察關聯，不能直接解讀為 AI 導致台灣企業流量減半。對經營者較實用的提醒是：品牌提及、內容引用、網站到站與成交應分開衡量，不以其中一項代替其他成果。</p>"
    },
    {
      "id": "channel-roles",
      "heading": "Meta 廣告 短影音 SEO 與 GEO 如何分工？",
      "paragraphs": [],
      "bodyHtml": "<p>整合行銷是依照顧客的決策任務配置工具，讓不同接觸點提供連貫的資訊。Meta 是平台、短影音是內容形式、廣告是付費分發方式，而 SEO／GEO 是優化方法，彼此可以重疊使用。</p><div class=\"insight-table\" role=\"region\" aria-label=\"整合行銷比較表\" tabindex=\"0\"><table><thead><tr><th scope=\"col\">工具或基礎</th><th scope=\"col\">主要任務</th><th scope=\"col\">適合提供的內容</th><th scope=\"col\">需要搭配的承接</th></tr></thead><tbody><tr><th scope=\"row\">Meta 等數位廣告</th><td>擴大觸及 測試訴求 推動行動</td><td>情境、優惠、示範、案例重點</td><td>與廣告一致的商品或服務資訊</td></tr><tr><th scope=\"row\">短影音</th><td>吸引注意 解釋單一問題 建立熟悉感</td><td>操作示範、常見疑問、專家解答</td><td>比較資訊、案例或清楚行動路徑</td></tr><tr><th scope=\"row\">SEO</th><td>承接主動搜尋與評估需求</td><td>選型、規格、費用條件、服務說明</td><td>易用頁面、相關內容與詢問流程</td></tr><tr><th scope=\"row\">GEO</th><td>觀察並改善 AI 搜尋中的內容呈現</td><td>清楚定義、有依據的解答與一致資訊</td><td>品質維護與可重複的觀察紀錄</td></tr><tr><th scope=\"row\">官網與顧客經營</th><td>提供證據 支援交易 延續關係</td><td>案例、預約、使用指引、售後資訊</td><td>團隊跟進與經同意的聯繫流程</td></tr></tbody></table></div><p>例如，一份有方法與限制說明的原創案例，可以改編為短影音與廣告素材；對內容有興趣的訪客，可以在官網閱讀完整條件，再依需求提出詢問。</p><p>這種分工可能補足資訊、減少重工並延續關係，實際是否改善獲利，仍需用企業自身資料驗證。</p><p>延伸閱讀：<a href=\"/insights/six-stage-marketing-funnel-insights\">六階段行銷漏斗與顧客決策任務</a>，進一步檢視各階段的內容與服務斷點。</p>"
    },
    {
      "id": "business-contexts",
      "heading": "台灣 B2B 電商與在地服務應如何配置？",
      "paragraphs": [],
      "bodyHtml": "<p>產業配置應以交易風險、決策時間、顧客問題與團隊能力為依據。以下是情境建議，並非產業效果排名或台灣市場統計。</p><div class=\"insight-table\" role=\"region\" aria-label=\"整合行銷比較表\" tabindex=\"0\"><table><thead><tr><th scope=\"col\">情境</th><th scope=\"col\">主要決策障礙</th><th scope=\"col\">優先投入方向</th></tr></thead><tbody><tr><th scope=\"row\">B2B 製造與設備</th><td>規格複雜 多人決策 採購風險</td><td>選型與技術內容、案例、業務承接，搭配示範影片及目標受眾推廣</td></tr><tr><th scope=\"row\">顧問與企業培訓</th><td>難以判斷專業 方法與適用性</td><td>專業解答、服務範圍、成果條件、案例與預約流程</td></tr><tr><th scope=\"row\">生活電商</th><td>商品差異 購買便利與履約疑慮</td><td>商品示範、廣告、完整商品頁、配送與退換貨資訊</td></tr><tr><th scope=\"row\">在地服務</th><td>地區 時間 信任與聯繫效率</td><td>正確商家資訊、服務範圍、真實評價、地區頁面與預約</td></tr></tbody></table></div><p>小團隊可以先建立「一個主要獲客入口＋一個可信承接頁＋一套追蹤跟進流程」。若既有廣告仍穩定獲利，先補案例與比較資訊即可；若市場尚無明確搜尋需求，應先驗證產品與訴求，再決定 SEO 投入。</p>"
    },
    {
      "id": "measurement",
      "heading": "如何衡量整合行銷成效？",
      "paragraphs": [],
      "bodyHtml": "<p>整合行銷應同時觀察入口、決策與營運成果。觀看量與網站流量適合用來診斷，但最終仍須連結合格詢問、新客成本與貢獻毛利。</p><div class=\"insight-table\" role=\"region\" aria-label=\"整合行銷比較表\" tabindex=\"0\"><table><thead><tr><th scope=\"col\">層級</th><th scope=\"col\">建議指標</th><th scope=\"col\">回答的問題</th></tr></thead><tbody><tr><th scope=\"row\">入口</th><td>相關受眾觸及、有效到站、搜尋曝光</td><td>是否接觸到合適的人</td></tr><tr><th scope=\"row\">決策</th><td>合格詢問、預約、商機進度</td><td>是否協助顧客往下一步前進</td></tr><tr><th scope=\"row\">營運</th><td>新客成本、成交、回購、貢獻毛利</td><td>成長是否值得持續投資</td></tr></tbody></table></div><h3>統一名單與成本定義</h3><p>合格詢問可以依服務範圍、需求與可聯繫性定義。新客成本應說明是否包含廣告、內容、人力及工具費用，避免用不同口徑比較。</p><p>B2B 企業則應追蹤同一批名單後續的成交，避免拿本月行銷費用直接對比數月前商機產生的營收。</p><h3>分清楚歸因與增量</h3><p>同一筆訂單可能被不同平台各自計入，不能直接將各平台轉換相加。平台依規則記錄的營收，也不全然等於廣告新增的營收。</p><p>Meta 提供 Conversion Lift，以實驗組與對照組比較增量影響。<a href=\"#source-4\" aria-label=\"參考資料 4\">[4]</a> 企業若要判斷新增投入是否造成改善，應評估適合的對照實驗；樣本不足時，先將結果視為方向性觀察。</p><h3>將 AI 可見度與實際商機交叉檢查</h3><p>可以選定與採購有關的一組問題，在固定平台、語言與地區定期觀察，記錄品牌提及、引用網址及內容正確性，再對照可辨識的 AI 推薦流量與合格詢問。</p><p>這只是選定題組的觀察，不能外推成整個 AI 市場的占有率；沒有點擊或缺少來源標記的影響，也可能無法完整辨識。</p>"
    },
    {
      "id": "priorities",
      "heading": "企業應從哪一步開始整合行銷？",
      "paragraphs": [],
      "bodyHtml": "<p>先找出目前最阻礙成交的問題，再決定下一筆投入。</p><div class=\"insight-table\" role=\"region\" aria-label=\"整合行銷比較表\" tabindex=\"0\"><table><thead><tr><th scope=\"col\">目前現象</th><th scope=\"col\">優先檢查與改善</th></tr></thead><tbody><tr><th scope=\"row\">廣告有人點 卻少人詢問</th><td>訴求與頁面是否一致 資訊是否足夠 行動流程是否順暢</td></tr><tr><th scope=\"row\">短片觀看高 合格詢問少</th><td>受眾是否吻合 內容是否連結服務 下一步是否清楚</td></tr><tr><th scope=\"row\">詢問多 成交少</th><td>名單品質 方案與價格 業務回覆與評估流程</td></tr><tr><th scope=\"row\">搜尋曝光增加 商機沒有增加</th><td>問題是否接近採購需求 頁面是否提供適切解答</td></tr><tr><th scope=\"row\">新客增加 卻沒有獲利</th><td>獲客成本 毛利 回購與服務成本</td></tr></tbody></table></div><p>前 30 天可以先完成購買問題盤點、主要承接頁與追蹤定義；接下來以同一主題測試內容與推廣，再根據商機品質調整。SEO 與長銷售週期的結果可能需要更長時間，不能將 90 天視為保證排名或回收的期限。</p><p>企業真正需要建立的，是一套讓顧客容易理解、查證與行動的資訊與服務流程。各種工具是否值得持續投入，應回到這套流程帶來的商業成果判斷。</p>"
    }
  ],
  "faqs": [
    {
      "question": "只做 Meta 廣告也能獲利 為什麼還要整合？",
      "answer": "若既有廣告穩定獲利，不必為了增加渠道而分散預算。先檢查是否存在比較資訊不足、單一入口依賴或跟進中斷，再用合適內容補足缺口。"
    },
    {
      "question": "SEO 與短影音應該先做哪一個？",
      "answer": "若顧客已有明確搜尋與選型需求，可先補搜尋內容；若需求需要被示範或解釋，可先測試短影音。兩者的優先順序取決於顧客任務與現有缺口。"
    },
    {
      "question": "做 GEO 就可以取代 SEO 嗎？",
      "answer": "不能如此推定。Google 表示 SEO 基礎仍適用其 AI 搜尋功能。[2][3] 其他 AI 平台需另外確認，企業仍須維護可靠、可理解的內容。"
    },
    {
      "question": "增加 SEO 與 GEO 一定能降低廣告成本嗎？",
      "answer": "不一定。新增內容可能改善評估與承接，也會產生成本。應用一致成本口徑、商機品質與適當測試，判斷整體投資是否值得。"
    }
  ],
  "sources": [
    {
      "title": "Think with Google：Navigating purchase behavior and decision-making，2020。平台研究，用於說明探索與評估框架，並非台灣代表性調查。",
      "url": "https://business.google.com/uk/think/consumer-insights/navigating-purchase-behavior-and-decision-making/"
    },
    {
      "title": "Google Search Central：AI features and your website。官方持續更新文件，適用於 Google Search 的 AI 功能。",
      "url": "https://developers.google.com/search/docs/appearance/ai-features"
    },
    {
      "title": "Google Search Central：Optimizing your website for generative AI features on Google Search。官方對 SEO 與生成式 AI 搜尋的說明。",
      "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
    },
    {
      "title": "Meta：Conversion Lift。官方增量衡量說明，不作為整合策略必然優於單一渠道的證據。",
      "url": "https://www.facebook.com/business/measurement/conversion-lift"
    },
    {
      "title": "Pew Research Center：Google users are less likely to click on links when an AI summary appears in the results，2025 年 7 月 22 日。樣本為 900 位美國成年人，觀察期間為 2025 年 3 月。",
      "url": "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
    }
  ],
  "relatedServices": [
    "paid-media",
    "creative-content",
    "strategy-campaigns",
    "seo-geo"
  ],
  "seo": {
    "title": "整合行銷策略：Meta 廣告、短影音與 SEO／GEO 如何分工",
    "description": "為什麼只做 Meta 廣告或短影音，未必能支援完整購買決策？九色鹿解析 SEO、GEO、官網內容與顧客經營的分工，提供台灣 B2B、電商與在地服務的整合行銷建議及成效衡量方法。"
  },
  "cta": {
    "heading": "串連每一次接觸，",
    "highlight": "讓策略走向成果。",
    "text": "從目前的獲客方式、內容缺口與成交流程，找出下一步值得優先投入的工作。",
    "label": "討論整合行銷策略"
  },
  "card": {
    "eyebrow": "CONNECTED STRATEGY",
    "title": "INTEGRATED",
    "caption": "從吸引注意，到完成決策。"
  }
},
{
  "slug": "six-stage-marketing-funnel-insights",
  "title": "有曝光、有詢問，成長為何仍卡住？六階段行銷漏斗洞察",
  "excerpt": "有曝光，未必有需求；有詢問，也未必能成交。從六階段行銷漏斗，檢視內容、通路與服務之間的成長斷點。",
  "category": "內容與品牌",
  "status": "published",
  "author": {
    "name": "九色鹿 Ninedr｜策略觀點",
    "bio": "以數據洞察與視覺敘事，連結品牌、市場與消費者。本文由九色鹿團隊整理策略觀察。",
    "kind": "Organization"
  },
  "publishedAt": "2026-10-23",
  "updatedAt": "2026-10-23",
  "keywords": [
    "整合行銷",
    "顧客旅程",
    "行銷漏斗",
    "GEO"
  ],
  "sections": [
    {
      "id": "lens",
      "heading": "漏斗與顧客旅程",
      "paragraphs": []
    },
    {
      "id": "framework",
      "heading": "六階段成長斷點",
      "paragraphs": []
    },
    {
      "id": "channels",
      "heading": "跨通路整合",
      "paragraphs": []
    },
    {
      "id": "case",
      "heading": "兩種經營情境",
      "paragraphs": []
    },
    {
      "id": "diagnosis",
      "heading": "轉換結構試算",
      "paragraphs": []
    },
    {
      "id": "priorities",
      "heading": "企業下一步",
      "paragraphs": []
    },
    {
      "id": "sources",
      "heading": "參考資料與分析說明",
      "paragraphs": []
    }
  ],
  "faqs": [],
  "sources": [],
  "relatedServices": [
    "strategy-campaigns",
    "seo-geo"
  ],
  "seo": {
    "title": "有曝光、有詢問，成長為何仍卡住？六階段行銷漏斗洞察",
    "description": "從認知、興趣、考慮到轉換、留存與推薦，檢視台灣企業的顧客旅程斷點，分析短影音、社團、官網與 LINE 如何銜接品牌信任與業務成果。"
  }
},
  {
    "slug": "geo-ai-search-guide",
    "title": "認識 GEO：AI 時代的搜尋新法則",
    "excerpt": "從爭取點擊，到成為值得引用的答案。當消費者開始用提問比較品牌，企業需要把 SEO 基礎、專業內容與真實信任串連起來。",
    "category": "GEO 與搜尋",
    "status": "published",
    "author": {
      "name": "謝清鴻 Steven Hsieh",
      "bio": "九色鹿 Director，專注數位內容、短影音敘事與品牌視覺，結合行銷實務，探索搜尋與消費決策的演進。本文由九色鹿 GEO 分享內容整理。",
      "image": "/images/steven-hsieh-full.webp"
    },
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-10-22",
    "keywords": [
      "GEO",
      "SEO",
      "生成式引擎優化",
      "AI 搜尋",
      "品牌內容",
      "E-E-A-T"
    ],
    "takeaways": [
      "以 SEO 為基礎，讓專業內容可被發現、理解與查證。",
      "以真實問題組織資訊，讓讀者能比較、判斷並採取行動。",
      "追蹤品牌提及、引用與有效詢問，不承諾唯一推薦或固定見效時間。"
    ],
    "sections": [
      {
        "id": "search-shift",
        "heading": "01 / 當消費者從搜尋，走向提問",
        "paragraphs": [
          "過去，消費者輸入關鍵字，再逐一開啟網頁比較；現在，他們也可能把需求、預算與限制直接交給 AI，請它整理候選方案。品牌的挑戰，不只是被找到，更是能否提供足以支持判斷的資訊。",
          "例如「青埔 A18、A19 周邊新建案有哪些差異？」或「台灣水磨石品牌有哪些，各有什麼優勢？」這類問題需要情境、條件與比較依據。以下是提問情境示例，並非特定平台的實際推薦結果。"
        ],
        "cards": [
          {
            "label": "SCENARIO 01",
            "title": "新建案比較",
            "text": "準備區位、交通、產品條件與查證來源，讓讀者知道哪些比較成立、哪些仍需現場確認。"
          },
          {
            "label": "SCENARIO 02",
            "title": "建材品牌挑選",
            "text": "以材質、適用場域、施工與保養資訊，搭配真實應用案例，回答採購者在意的問題。"
          }
        ]
      },
      {
        "id": "seo-geo",
        "heading": "02 / GEO 與 SEO：共同基礎，不同觀察角度",
        "paragraphs": [
          "GEO 是 Generative Engine Optimization，通常指改善品牌與內容在生成式搜尋回答中的可見度。它不是一套保證被 AI 推薦的公式，也不代表 SEO 已經過時。",
          "Google 的官方指引指出，既有 SEO 基礎仍適用於其生成式搜尋功能；沒有必須額外加入的特殊 Schema。文章結構與表格應服務讀者理解，而不是為了迎合想像中的 AI 規則。[1]"
        ],
        "table": {
          "headers": [
            "觀察面向",
            "SEO",
            "GEO"
          ],
          "rows": [
            [
              "主要關注",
              "搜尋中的可見度與合適流量",
              "生成回答中的品牌提及與來源引用"
            ],
            [
              "內容任務",
              "回答搜尋意圖，提供完整資訊",
              "提供可查證的觀點、比較與證據"
            ],
            [
              "共同基礎",
              "可存取的網頁、清楚架構、可靠內容",
              "沿用 SEO 基礎，持續補足資訊品質"
            ],
            [
              "衡量方式",
              "曝光、點擊、有效詢問與轉換",
              "另觀察提及、引用、推薦情境與導入流量"
            ]
          ]
        }
      },
      {
        "id": "aica",
        "heading": "03 / 用 A-I-C-A 理解新的決策路徑",
        "paragraphs": [
          "九色鹿以 A-I-C-A 作為規劃內容的工作模型：從需求出發，經過 AI 整理與社群驗證，再走向行動。這是策略思考框架，不是所有消費者都會依序經歷的固定流程。"
        ],
        "cards": [
          {
            "label": "A / AWARENESS",
            "title": "意識需求",
            "text": "理解使用者的痛點、限制與目標，先回答為什麼需要這項產品或服務。"
          },
          {
            "label": "I / AI-FILTERING",
            "title": "整理方案",
            "text": "提供清楚的條件、差異與適用情境，協助使用者比較候選方案。"
          },
          {
            "label": "C / COMMUNITY",
            "title": "社群驗證",
            "text": "透過真實經驗、公開案例與第三方資訊，驗證品牌承諾是否可信。"
          },
          {
            "label": "A / ACTION",
            "title": "採取行動",
            "text": "讓使用者能順利預約、詢價或聯繫，將資訊理解接到下一步。"
          }
        ]
      },
      {
        "id": "visibility-gaps",
        "heading": "04 / 品牌需要留意的四個資訊缺口",
        "paragraphs": [
          "與其製造被 AI 淘汰的焦慮，更值得盤點品牌是否缺少決策所需的內容。資訊密集、比較條件多的產品或服務，尤其可以從以下問題開始。"
        ],
        "steps": [
          "發現缺口：關鍵服務是否只有圖片，缺少能閱讀與檢索的文字？",
          "比較缺口：網站是否說明差異、限制、適用對象，而不只是口號？",
          "信任缺口：案例是否交代背景與證據，作者與品牌資訊是否清楚？",
          "行動缺口：讀者理解內容後，是否能順利找到諮詢或服務入口？"
        ]
      },
      {
        "id": "rag",
        "heading": "05 / 從檢索到回答：理解 RAG 的概念",
        "paragraphs": [
          "RAG（Retrieval-Augmented Generation，檢索增強生成）是先取得相關資料，再用資料輔助產生回答的方法。可用「理解問題、取得資料、整理回答」來理解它；不同系統的資料來源與流程並不相同，也不是每次 AI 回答都會即時聯網。",
          "對品牌而言，實務重點是把專業資訊公開呈現，讓讀者可以驗證內容的出處、條件與限制。即使被引用，也應持續檢查回答是否準確傳達品牌資訊。"
        ]
      },
      {
        "id": "trust",
        "heading": "06 / 讓專業可信：用 E-E-A-T 檢視內容",
        "paragraphs": [
          "經驗、專業、權威與可信度，是檢視內容品質的四個角度。Google 說明 E-E-A-T 本身不是單一排名因子；更不能把它當作所有 AI 系統的入選分數。[2]"
        ],
        "cards": [
          {
            "label": "EXPERIENCE",
            "title": "第一手經驗",
            "text": "說明實際操作、使用情境與觀察，讓案例有背景、有方法。"
          },
          {
            "label": "EXPERTISE",
            "title": "專業判斷",
            "text": "交代作者角色與專業依據，解釋方法適用的條件與限制。"
          },
          {
            "label": "AUTHORITATIVENESS",
            "title": "可查證的背書",
            "text": "連結相關研究、公開紀錄或第三方資料，不以自我宣稱取代證據。"
          },
          {
            "label": "TRUSTWORTHINESS",
            "title": "透明與可信",
            "text": "維持品牌與聯絡資訊一致，標明資料來源，及時修正錯誤。"
          }
        ]
      },
      {
        "id": "implementation",
        "heading": "07 / 從四個方向，開始品牌 GEO 計畫",
        "paragraphs": [
          "九色鹿建議先盤點現況，再設定內容優先序。把可以驗證的改進做紮實，比追求大量重複文章或沒有根據的網路提及更有價值。"
        ],
        "steps": [
          "盤點提問：整理業務與客服常見問題，依情境、比較條件及購買階段排序。",
          "補足內容：提供直接回答、案例、比較表與限制說明，優先處理使用者真正缺少的資訊。",
          "檢查技術：確認頁面可正常存取、內部連結清楚，必要的結構化資料與畫面內容一致。",
          "累積信任：維持官網、商家及社群資訊一致，收集真實回饋，建立可追溯的內容更新流程。"
        ]
      },
      {
        "id": "measurement",
        "heading": "08 / 不只問多久見效，更要定義如何衡量",
        "paragraphs": [
          "抓取、收錄、內容競爭程度與平台機制都會影響結果，不能保證 GEO 在一到四週內見效，也不能保證品牌成為唯一推薦。SEO 與 GEO 都應以持續觀察、測試和修正的方式推進。",
          "實務上可以先建立一組固定的問題與比較條件，記錄平台、語言、測試時間、品牌提及、引用頁面與回答準確度；再搭配網站導入流量、有效詢問與轉換，判斷是否接近商業目標。單次回答截圖不應代表整體成效。"
        ]
      }
    ],
    "faqs": [
      {
        "question": "可以跳過 SEO，只做 GEO 嗎？",
        "answer": "不建議把兩者拆開。可存取的網站與可靠內容是共同基礎。以 Google 的 AI 搜尋功能為例，SEO 原則仍然適用；其他平台的存取與引用機制則需分別確認。"
      },
      {
        "question": "加入 FAQ 或 Schema 就一定會被引用嗎？",
        "answer": "不會。FAQ 的價值是回答讀者問題；結構化資料應對應頁面上的真實內容，不能保證 AI 引用或推薦。"
      },
      {
        "question": "多久能看見成效？",
        "answer": "沒有通用的固定週數。先建立可比較的基準，再持續記錄提及、引用、網站流量及有效詢問，並依實際結果調整。"
      },
      {
        "question": "品牌應該從哪裡開始？",
        "answer": "先盤點使用者常問的問題、網站存取狀態、既有內容與第三方資訊，再挑選最接近商業目標的主題優先改善。"
      }
    ],
    "sources": [
      {
        "title": "[1] Google Search Central：生成式 AI 搜尋最佳化指南",
        "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
      },
      {
        "title": "[2] Google Search Central：建立實用、可靠、以人為本的內容",
        "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
      }
    ],
    "relatedServices": [
      "seo-geo",
      "creative-content",
      "strategy-campaigns"
    ],
    "seo": {
      "title": "認識 GEO：AI 時代的搜尋新法則｜SEO、內容信任與實務步驟",
      "description": "從九色鹿觀點認識 GEO：比較 SEO 與生成式搜尋，理解 A-I-C-A、RAG 與 E-E-A-T，建立可衡量的品牌內容計畫。"
    }
  }
];
export const publishedArticles=()=>articles.filter(a=>a.status==='published');
