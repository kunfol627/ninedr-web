# 九色鹿 Ninedr 官方網站

黑底青檸新版官網，手機優先。此分支由已驗收的新版官網移植，保留原始 GitHub 歷史。

## 架構
React 19、Vinext（Next.js App Router 相容）、GSAP、Cloudflare Workers。此版本使用 Vinext / Vite 編譯，不使用 `next build`。已移除預覽平台專用登入、connector 與託管識別設定。

## 安裝與建置
Node.js 22.13+；package manager 使用 package.json 指定的 pnpm 版本。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

建置輸出：dist/server/wrangler.json（Worker 設定）、dist/client（靜態資源）。

## Cloudflare Workers Builds
1. 建立 Worker，名稱 `ninedr-web`，連接 `kunfol627/ninedr-web`。
2. 遷移驗收期間選 `cloudflare-migration` 為部署分支，root 為專案根目錄。
3. Install command：`corepack enable && pnpm install --frozen-lockfile`。
4. Build command：`pnpm build`。
5. Deploy command：`pnpm exec wrangler deploy --config dist/server/wrangler.json`。
6. 先以 Cloudflare 提供的 workers.dev 網址驗收，再加入自訂網域。不要先覆寫現行 Vercel 的 DNS。

Worker 名稱必須與 wrangler.jsonc 一致。若帳號已有同名 Worker，先確認用途，再決定是否改名。此儲存庫不含 Cloudflare account ID、API token 或私密金鑰。

## 聯絡表單
POST /api/contact。固定 To：info@ninedr.com；CC：cathy@ninedr.com、steven@ninedr.com；Reply-To 使用訪客 Email。

### 現況與歷史
2026-10-27 程式碼稽核：`f552c85`（2026-10-23，`feat: enable Resend contact form with Turnstile verification`）刻意將 `CONTACT_ENABLED` 改為字串 `"true"`，設定寄件地址及公開 Turnstile site key。原文件「預設 false」已過時，本次不回退此設定，也不宣稱已完成真實收件驗收。

目前 `wrangler.jsonc` 未宣告 EMAIL binding，預期使用 Resend；Dashboard 實際 binding、secrets 及網域驗證狀態仍需另行核對。`GET /api/contact` 的 enabled 只代表必要設定存在，不代表網域已驗證或信件可送達。必要設定空白或缺漏時回傳 enabled=false，POST 拒絕寄送。

### 環境設定與切換
| 項目 | 隔離的預覽環境 | 正式環境 |
| --- | --- | --- |
| CONTACT_ENABLED | 新預覽預設使用 `"false"`；受控收件驗收須另行安排 | 驗收後使用 `"true"`；現有分支已為 true，不等同驗收證據 |
| CONTACT_FROM | 經寄信服務驗證的寄件網域地址 | 現有 `website@mail.ninedr.com`；須核對 mail.ninedr.com 驗證狀態 |
| TURNSTILE_SITE_KEY | 預覽 widget 公開 key | 正式 widget 公開 key |
| TURNSTILE_SECRET_KEY | 預覽 Worker secret，與 site key 配對 | 正式 Worker secret，與 site key 配對 |
| RESEND_API_KEY | 未安排真實寄信時不提供 | Worker secret，具寄信權限且允許寄件網域 |
| CONTACT_PREVIEW_ORIGIN | 精確 HTTPS origin，無路徑或結尾斜線；hostname 同步加入 Turnstile | 不需要時不設定 |
| robots.index | 保持 false | 完成正式驗收及預覽隔離後才改 true |

此 repo **沒有**命名的 preview/production Wrangler 環境；目前為單一 `ninedr-web` Worker。上表為部署要求，不代表已有兩套部署。要隔離預覽，須另外建立 Worker 與對應設定、secrets、建置及部署目標；不可直接假設 `--env preview` 已可使用。Workers Builds 的 production 標籤也不等同正式網域驗收完成。

非秘密 vars 由 `wrangler.jsonc` 管理，部署前核對建置產物 `dist/server/wrangler.json`；不要只在 Dashboard 改值而被下次部署覆寫。Secrets 設在正確 Worker，禁止提交 Git 或輸出金鑰。每次提交此分支可能觸發既有 Workers Builds 自動部署。

### 寄信服務與限制
- 目前採 Resend：驗證 `CONTACT_FROM` 所用網域及 SPF/DKIM，核對 API key 的寄送權限、配額、限流與 suppression。Resend 測試寄件網域不能作為向三個公司信箱正式寄送的替代方案。
- 固定 To：info@ninedr.com；CC：cathy@ninedr.com、steven@ninedr.com。訪客只能成為 Reply-To，無法覆寫 To/CC。
- 後端也保留 Cloudflare Email Sending：只有 `EMAIL.send` 是函式才採用；若同時設定 Resend，仍優先使用 EMAIL。Cloudflare 失敗後**不會自動改用 Resend 重寄**，避免結果不明時重複寄信。
- 若未來改用 Cloudflare，須驗證寄件網域、收件限制及帳號權限，並更新目前前端只揭露 Resend 的隱私告知。可用以下 binding 限制三個收件地址，不能只加入 binding 就視為驗收完成：

```json
"send_email": [{
  "name": "EMAIL",
  "allowed_destination_addresses": ["info@ninedr.com", "cathy@ninedr.com", "steven@ninedr.com"]
}]
```

Microsoft 365 根網域 MX 保持原值，不為了寄送表單而搬遷收件服務。寄件子網域所需 DNS 記錄依服務商驗證畫面另行核對。

### Turnstile 與驗收
伺服器會檢查 Siteverify 的成功狀態、hostname 等於提交 Origin 的 hostname，以及 action=`contact`。token 有效期與單次使用由 Siteverify 判定；前端過期或寄送後會清除／重設 token。正式環境不得使用測試金鑰。

目前允許的 Origin 是 `https://www.ninedr.com`、既有 Sites 預覽來源 `https://ninedr-vosio-minimal.milkyfrost129.chatgpt.site`，以及選填的單一 `CONTACT_PREVIEW_ORIGIN`。workers.dev 不會自動獲准，裸網域 ninedr.com 應重新導向 www；後續停用舊 Sites 時再移除其允許來源。

受控驗收前先核對網域、secrets、widget hostname、隱私告知與收件對象；再由授權人執行測試，確認三個信箱實際收件、垃圾郵件匣、Reply-To 及服務商投遞事件。記錄部署 SHA、時間與結果，不保存訪客內容或金鑰。API 回傳 id 僅代表服務商接受，不能當成已送達。

本次只執行模擬服務測試，不寄出真實郵件。服務端拒絕未授權來源、過大／不完整資料及未通過 Turnstile 的提交；未儲存表單至資料庫，不記錄訪客內容。現有程式沒有應用層寄信速率限制，正式流量驗收亦須核對 Cloudflare 防濫用規則與寄信配額。

## 正式切換
- 先記錄 Cloudflare 中現行 www CNAME 與根網域 A 值，備份 DNS zone。
- Microsoft 365 的 MX、SPF、DKIM、DMARC 保留；autodiscover 應為 DNS only。
- 完成 workers.dev、寄信、手機／桌面、圖片與站內連結驗收。
- 在 Workers 自訂網域綁定 www.ninedr.com，依 Dashboard 的衝突提示處理既有 www 記錄；不要直接套用 ChatGPT Sites 的 CNAME。
- 驗證 HTTPS、主機路由，再設定 ninedr.com 至 www 的 301（保留路徑與 query）。
- 此遷移版本 `app/layout.tsx` 的 robots.index=false 是硬編碼，沒有環境變數開關；本次保留。`public/robots.txt` 允許爬取，讓搜尋引擎讀到 HTML noindex，並不表示允許索引；canonical/sitemap 指向正式站也不會解除 noindex。
- 正式驗收完成後，先確保預覽使用獨立仍帶 noindex 的部署，或另有經驗證的 hostname 層級 X-Robots-Tag:noindex 保護，再將正式部署 robots.index 改為 true。不能在仍共用同一 Worker 的情況下直接翻轉，否則 workers.dev 也可能解除保護。
- 建置部署後逐一檢查首頁、服務、案例、洞察與靜態活動頁的實際 HTML meta robots 及 HTTP X-Robots-Tag；根 layout 不涵蓋 public 下獨立 HTML。正式站不得殘留 noindex，預覽仍須保有 noindex。確認 robots.txt、sitemap、canonical 與 HTTPS/重新導向一致。
- 最後提交 Search Console sitemap；Vercel 舊部署與原 main 分支保留供回復。

## 目前驗證
PR #1 的 Cloudflare bot 已回報 `670f9fa` 在 2026-10-26 02:21 UTC 部署成功，因此原「尚未部署」說明已過時。這是 CI 部署紀錄，不是獨立 Dashboard／正式網域／收件驗收。PR 仍為 Draft、未合併；本次未變更 DNS、開啟新的寄信環境或移除 noindex。

本次修正驗證：`pnpm test` 16 項通過、`pnpm typecheck` 通過、`pnpm build` 通過、`git diff --check` 通過。嘗試本機 Wrangler HTTP 預覽時因執行環境 `uv_interface_addresses` 系統錯誤無法啟動，未完成實際回應 HTML 驗證；不可將建置成功視為此項已通過。

官方設定參考：
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/api-reference/errors
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/email-service/api/send-emails/workers-api/

舊專案 public/geo、public/golfkit、public/luming 與既有靜態資源已保留，避免換版時移除其他活動頁面；仍需在 Cloudflare 預覽上驗收這些路徑。
