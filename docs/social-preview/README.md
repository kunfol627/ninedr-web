# LINE / Facebook 分享預覽修正（2026-10-28）

基準：cloudflare-migration `53a654990a38207583828beeddad27933f3dae0a`。

## 實測與原因界線

使用 curl 直接取得正式站原始 HTML，分別模擬一般瀏覽器、LINE（facebookexternalhit/1.1;line-poker/1.0）及 Facebook User-Agent。首頁皆為 200，OG title/description/url 存在，圖片指向 300×300 favicon；圖片皆為 200 image/png。/o2o 皆 307 到 /o2o/，最終 200，但完全沒有 OG 標籤。robots.txt 為 Allow: /。正式 HTML 的 meta robots 及 X-Robots-Tag 都是 index, follow。

所以 /o2o 可確認有 metadata 缺口；首頁未重現伺服器缺少標題或圖片無法存取，不能斷言 favicon 尺寸是 LINE 全部預覽消失的唯一原因。UA 模擬不等於平台真實來源 IP，也不等於平台的快取或 App 顯示驗收。未取得 LINE/Meta 爬蟲後台紀錄。

讀取到先前 homepage buffering 實驗已因 LINE 重測失敗撤回，本次不重新加入 buffering 或 UA 分流。

## 修正

- 同時更新根 layout 與首頁 page metadata（首頁自身 openGraph 會覆蓋根設定）。
- 新增兩張 1200×630 PNG：沿用既有品牌 logo 與黑／青檸視覺；檔名版本化以區別舊圖片快取。
- O2O 在原始 head 明確提供 OG title、description、url、type、site_name、locale、image 及圖片資訊；Twitter card 與 OG 使用相同內容。
- 保留既有標題、描述及 canonical；不改 DNS、sitemap、robots.txt、Worker 路由或 hostname 索引規則。
- 保留測試網域 noindex；實測 ninedr-web.kun-fol627.workers.dev/o2o/ 回傳 200，header 及 meta 仍為 noindex, follow。

## 驗證

pnpm typecheck、pnpm test（27 項）、pnpm build、git diff --check 通過。Wrangler 本機 HTTP preview 因執行環境 uv_interface_addresses 錯誤無法啟動，未將建置成功當成 HTTP 驗證；部署後須執行下列驗證。

```sh
python3 scripts/check-social-preview.py --expect-new --output /tmp/social-production.json
python3 scripts/check-social-preview.py --origin https://ninedr-web.kun-fol627.workers.dev --expect-new --output /tmp/social-preview.json
```

腳本驗證三種 UA 的標籤一致、OG 位於原始 head、HTTP 成功、圖片 PNG 1200×630、canonical/OG URL 一致、Twitter 圖一致及 hostname 索引政策。圖片直接透過公開 HTTPS 取得，不使用登入或簽名 URL。

最後仍需在 LINE 分享正式首頁及 /o2o/ 實測卡片；Facebook 可使用 Sharing Debugger 重新擷取。若首頁仍不顯示，應對照實際分享時間檢查 Cloudflare Security Events/爬蟲請求記錄與平台快取，而非再猜測 metadata 原因。勿為了分享而關閉整站安全防護或解除預覽 noindex。
