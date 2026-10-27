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
