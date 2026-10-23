// Only reviewed, published entries appear on the public index, detail pages and sitemap.
// Dates must be actual ISO dates. Sources should point to the original evidence.
export type Article = {
 slug:string; title:string; excerpt:string; category:'GEO 與搜尋'|'廣告與媒介'|'內容與品牌';
 status:'draft'|'published'; author:{name:string;bio:string;image?:string;kind?:'Person'|'Organization'};
 publishedAt:string; updatedAt:string; keywords:string[];
 cover?:{src:string;alt:string;width:number;height:number};
 takeaways?:string[];
 sections:{id:string;heading:string;paragraphs:string[];cards?:{label:string;title:string;text:string}[];table?:{headers:string[];rows:string[][]};steps?:string[]}[];
 faqs:{question:string;answer:string}[];
 sources:{title:string;url:string}[];
 relatedServices:string[];
 seo:{title:string;description:string};
};
export const articles:Article[]=[
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
