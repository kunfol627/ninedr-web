# 九色鹿 SEO／GEO 第一輪檢查

日期：2026-10-27（台北時間）；程式碼基準：cloudflare-migration 1da3410。公開 GET 測試透過此執行環境的網路代理進行，結果為時間點快照，不是 Search Console 索引報表。

## 一、舊網址與可爬取條件

- 正式 sitemap.xml 有 69 個網址，逐頁 GET 全部回傳 200；每頁都有 index, follow（HTML 與 X-Robots-Tag），canonical 均對應自己的正式 HTTPS 網址。
- robots.txt 為 Allow: /，指向正確 sitemap。
- 測試不存在的路徑回傳 404 及 noindex，沒有把所有錯誤路徑導回首頁。
- 舊 sitemap_index.xml 回傳 404。新版 sitemap 已成功提交；先確認舊 sitemap 沒有獨有歷史網址，再從 Search Console 移除過時提交紀錄即可。移除紀錄不等同移除網頁收錄。
- GitHub 舊 main 基準 3e2ad4f 是單頁首頁，加 7 份 public HTML。GEO、GolfKit、LuMing 的路徑均保留；index.html 會導向資料夾路徑；GolfKit FAQ/privacy/terms、LuMing FAQ 的 .html 別名實測 307 到無副檔名路徑，目的頁均為 200。
- 活動頁沒有 canonical，且沒有納入目前 69 頁 sitemap。後續應按實際正式路徑補 self-canonical；將要經營自然搜尋的活動主頁補入 sitemap，勿因只是 FAQ／隱私頁就批次加 noindex。
- 裸網域 https://ninedr.com/ 目前 307 到 www，回應帶有 Vercel 標頭（僅為觀察，不能據此斷言整個架構）。永久網域整併建議 301/308，另驗證保留 path/query；本次不動 DNS。
- http://www.ninedr.com/ 在本次代理測試中得到 200，未觀察到 HTTPS 重新導向。此結果需用一般瀏覽器 Network 或 Cloudflare 設定獨立交叉確認，避免把代理行為誤判為來源站設定。
- 舊首頁 #philosophy、#services、#market-trends、#process、#team、#cases 在新版缺少對應 id。fragment 不會傳到伺服器，不能用伺服器 301 精確判斷；可補語意相符的錨點／客戶端映射，不可將全部當成遺失頁面。新首頁 / 保持相同，不能對整個首頁做轉址。

### 尚待資料才能完成的部分

目前只比對可取得的 GitHub 舊站，不足以涵蓋更早期 CMS 所有 URL。舊 sitemap_index.xml 的過去存在紀錄不能推導出其歷史文章網址。須有 Search Console 網頁索引／成效頁面匯出、舊 sitemap 備份或歷史流量落地頁，才能建立完整一對一 301 清單。不得猜測路徑並把所有 404 轉首頁。

69 頁通過 HTTP／metadata 檢查不等於 Google 已收錄 69 頁。使用者已提供首頁修正後即時測試通過與 sitemap 提交成功的證據；其餘 URL 的實際收錄狀態仍需 Search Console 資料。

證據：[逐頁結果](live-check-2026-10-27.json)、[舊網址與網域重新導向](legacy-redirects-2026-10-27.json)。

## 二、GA4 詢問追蹤

repo 未找到 GA4／GTM，Cookie 介面明示未啟用分析。完成 [事件與驗收規格](ga4-tracking-plan.md)。目前缺少 www.ninedr.com 的 GA4 Measurement ID，未安裝追蹤、未向未知資源傳送事件。可用的 Windsor.ai 數據連接尚未連接，也尚未取得 GA4／Search Console 帳號內資料。

## 三、主要服務頁盤點

已完成 [六大服務缺口清單](service-page-inventory.md)。現有 6 項服務集中於 /services，均有簡介、子項目及 CTA；缺口主要為各服務的獨立交付、證據、適用條件與 FAQ。先做 SEO／GEO 完整詳頁，再逐步擴充，避免批次薄內容。尚未發布新服務承諾或虛構案例。

## 工作狀態

已完成公開網址／程式碼檢查、GA4 接線規格、六大服務盤點。本批次只有稽核文件，沒有更動 runtime、DNS、寄信或索引政策。下一步先取得 GA4 正確資料串流 ID，完成接線與 DebugView 驗收，再執行服務頁內容改版。網站地圖、舊錨點、靜態 canonical 的修復候選項目已列明，尚未實作。
