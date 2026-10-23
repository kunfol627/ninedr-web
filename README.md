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

預設 CONTACT_ENABLED=false，不會寄信；畫面提供整理需求與 mailto。真正寄送前必須完成寄件網域驗證、Turnstile、隱私告知與三個信箱的收件驗收。

建議使用 Cloudflare Email Sending（目前 Beta），啟用寄件功能即可；Microsoft 365 MX 保持原值，不啟用根網域 Email Routing 收件搬遷。

驗證寄件網域及允許的收件地址後，在 wrangler.jsonc 加入：

```json
"send_email": [{
  "name": "EMAIL",
  "allowed_destination_addresses": ["info@ninedr.com", "cathy@ninedr.com", "steven@ninedr.com"]
}]
```

將以下非秘密 vars 設定於 wrangler.jsonc（需與 Dashboard 保持一致）：
- CONTACT_ENABLED：確認可寄送後才改為 `true`。
- CONTACT_FROM：已驗證的純 Email 寄件地址，例如 `website@mail.ninedr.com`；示例尚未建立。
- TURNSTILE_SITE_KEY：公開 site key。
- CONTACT_PREVIEW_ORIGIN：選填，完整的單一 workers.dev 預覽來源，例如 `https://實際名稱.實際帳號.workers.dev`；必須同步加入 Turnstile hostname allowlist。

TURNSTILE_SECRET_KEY 以 Cloudflare Worker secret 設定，不提交 Git。若帳號無法使用 Email Sending，可不設定 EMAIL binding，改用 Resend 與 RESEND_API_KEY secret；後端保留此備援，仍需驗證寄件地址。

服務端拒絕未授權來源、過大／不完整資料及未通過 Turnstile hostname/action 驗證的提交。未儲存表單至資料庫，不記錄訪客內容。測試使用模擬服務，不代表實際送達。

## 正式切換
- 先記錄 Cloudflare 中現行 www CNAME 與根網域 A 值，備份 DNS zone。
- Microsoft 365 的 MX、SPF、DKIM、DMARC 保留；autodiscover 應為 DNS only。
- 完成 workers.dev、寄信、手機／桌面、圖片與站內連結驗收。
- 在 Workers 自訂網域綁定 www.ninedr.com，依 Dashboard 的衝突提示處理既有 www 記錄；不要直接套用 ChatGPT Sites 的 CNAME。
- 驗證 HTTPS、主機路由，再設定 ninedr.com 至 www 的 301（保留路徑與 query）。
- 此遷移版本保留 noindex，正式上線時將 app/layout.tsx 的 robots.index 改為 true，建置並部署後檢查 HTML。sitemap 與 canonical 已指向 https://www.ninedr.com。
- 最後提交 Search Console sitemap；Vercel 舊部署與原 main 分支保留供回復。

## 目前驗證
本機獨立 Worker 建置、TypeScript 與模擬寄信測試；尚未部署到公司 Cloudflare 帳號，尚未測試真實寄信／TLS／正式流量。

舊專案 public/geo、public/golfkit、public/luming 與既有靜態資源已保留，避免換版時移除其他活動頁面；仍需在 Cloudflare 預覽上驗收這些路徑。
