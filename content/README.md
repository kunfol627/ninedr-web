# 文章維護

編輯 articles.ts 的 articles 陣列。現階段沒有已發布文章，頁面呈現真實的準備中狀態。

每篇文章需有：slug、title、excerpt、category、status、author（name/bio）、publishedAt、updatedAt、keywords、sections（id/heading/paragraphs）、faqs、sources、relatedServices、seo（title/description）；cover 選填，需有 src/alt/width/height。

- slug 使用穩定英文短網址；章節 id 唯一。
- 日期填寫真實 ISO 日期；更新日期應反映實質修改。
- 作者與來源經確認再發布；不虛構作者、引用、成果或發布日期。
- relatedServices 使用 services.ts 的 slug。
- status 為 draft 時不出現在列表、文章路由或 sitemap；published 才正式呈現。
- Article 結構化資料、目錄、摘要、作者、發布與更新日期、FAQ、引用來源、相關服務與 Open Graph 已由版型支援。
- 尚無 CMS 編輯後台；透過程式資料更新並重新部署。
- 關鍵字欄位用於內容規劃，不輸出無效的 meta keywords。
- 維持私人審稿站 noindex；正式發布需依 SEO-PLAN.md 檢查。
