# GA4 詢問追蹤：待接線規格

日期：2026-10-27。來源：cloudflare-migration 1da3410 程式碼。

## 已確認

新版 app、lib 與 public HTML 未找到 gtag、GTM、GA4 measurement ID 或 dataLayer。Cookie 設定已有 180 天有效期限及 ninedr-consent-change 事件，但目前只是儲存選擇，沒有分析 SDK。表單成功分支已有 response.ok 與 result.ok 檢查，可作為追蹤觸發位置。

## 事件規格

| 事件 | 觸發條件 | 允許參數 | 成效定義 |
|---|---|---|---|
| page_view | 正式網域、同意分析後、每次實際換頁一次 | 移除 query/hash 的 page_location、page_title | 瀏覽，不是詢問 |
| generate_lead | POST /api/contact 收到 HTTP 成功且 ok=true，每次成功一次 | form_id=contact、method=website_form | 表單提交成功；不等同信箱送達、有效商機或成交 |
| contact_click | 正式站 LINE／Email／電話連結點擊 | contact_method=line/email/phone、page_path、placement | 聯繫意圖，不等同有效詢問 |

不傳姓名、公司、Email、電話、訊息、Turnstile token，也不傳含預填資料的 mailto URL。拒絕／未選擇分析時不載入 GA；過期選擇重新詢問，撤回後停止送事件，不補送拒絕期間的行為。只在 www.ninedr.com 啟用，預覽不傳正式資源。不要將自動 form_submit 及 generate_lead 都設為同一商機的主要成果，以免重複計算。

## 接線前必要輸入

- 確認屬於九色鹿 www.ninedr.com 的 GA4 Web Measurement ID（G- 開頭）。若採 GTM，確認現有容器及其既有 GA 標籤，避免重複裝設。
- 存取 GA4 後確認資料串流、時區、內部流量、Enhanced Measurement、Google tag 是否已由 Cloudflare／其他入口注入；repo 未找到不代表外部絕無注入。
- 同步調整 Cookie 視窗及隱私政策，使其準確揭露分析目的、Google 服務及使用者選擇；不保留「目前未啟用」誤導文字。

## 驗收

模擬：缺 ID／預覽／未同意／拒絕不載入；同意一次初始化；換頁不重複；API 錯誤、驗證失敗、停用 mailto 備援不觸發 generate_lead；成功一次；參數沒有個資。連接目標資源後以 DebugView／Realtime 確認，再設定 generate_lead 為 key event。正式真實測試信需受控安排，不將 API 接受宣稱為郵件送達。

官方參考：https://support.google.com/analytics/answer/9267735 、https://support.google.com/analytics/answer/12966437

## 2026-10-27 接線進度

使用者提供 `G-S7TGMX204R`，已實作 app/analytics.tsx 與 lib/analytics.mjs，主站 React 頁面依 Cookie v2 選擇載入 GA4；不重用啟用 GA4 前的 v1 同意。瀏覽使用手動 page_view（send_page_view=false），同頁 query/hash 變化不重複送；表單成功與聯繫連結各自追蹤。Google Signals 與廣告個人化停用。訪客未選擇／拒絕／預覽站不載入 SDK；撤回時設定 ga-disable，清除本串流 GA Cookie；撤回前尚未載入 SDK 的事件佇列會丟棄。已載入的 SDK 無法從 JS 執行環境卸載，因此保留它但禁用收集，再同意時不重複載入。

分析只涵蓋使用 app/layout.tsx 的主站頁面。public 下的 GEO、GolfKit、LuMing 等獨立 HTML 沒有注入這套追蹤／同意視窗，不宣稱這些頁面已接線。若要擴大追蹤，須另做相同的同意與事件整合。

### GA4 後台仍需完成

1. 管理 → 資料串流 → www.ninedr.com → 加強型評估：關閉整組自動事件（包含網頁瀏覽／瀏覽器歷史變更及表單互動），讓本站以手動事件為唯一來源。只設 send_page_view=false 不能關閉 Enhanced Measurement 的歷史事件。日後若啟用其他自動事件，先確認沒有個資參數及重複計算。
2. 將 generate_lead 設為 key event；contact_click 是意圖，不當成已收件或成交。
3. 確認串流網址與目標 Measurement ID，GA4 Realtime／DebugView 實際驗收；目前沒有 GA4 帳號寫入或讀取權限，本次未宣稱 Google 已收到事件。DebugView 需 Tag Assistant 或專用測試設定，不在正式程式永久開啟 debug_mode。
4. 確認內部流量與資料保留設定，先驗證後再排除內部測試流量；不能把事件過濾後收不到測試誤認成追蹤壞掉。

### 驗證與限制

8 項分析單元測試涵蓋同意、預覽、到期、重複頁覽、API 成敗、URL／聯繫個資清理、撤回前後、SDK 失敗與重試；既有表單與索引 19 項測試通過。TypeScript、完整 Worker 建置與 diff check 通過。本機 Wrangler HTTP 預覽仍遇到 uv_interface_addresses 系統錯誤，不能宣稱已做完整瀏覽器端到端驗收。

手動事件會移除 page_location/page_referrer 的 query/hash，避免預填個資進入分析；目前不額外擷取 UTM／gclid，因此需另驗證活動歸因需求。程式內建未使用訪客資料的測試，不發送真實信或實際 GA 收集請求。Google SDK 自動診斷與行為須於目標串流停用 Enhanced Measurement 後，再以瀏覽器網路與 GA 報表驗收。

官方依據：https://developers.google.com/analytics/devguides/collection/ga4/views 、https://developers.google.com/tag-platform/security/guides/consent
