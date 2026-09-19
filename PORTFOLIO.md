# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。它提供簡潔的待辦管理流程，讓使用者可以新增、完成、篩選與清理日常工作項目，並在離線環境中保留資料。

## 線上展示
![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
[開啟 GitHub Pages](https://richie-chirue.github.io/my-copilot-workshop/
)

> 請將上方網址替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，空白內容不會被加入。
- 勾選待辦事項為已完成，完成項目會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 清除所有已完成的待辦事項，執行前會顯示確認對話框。
- 沒有已完成項目時，清除按鈕會停用。
- 顯示整體清單的未完成項目數量。
- 使用「全部」、「未完成」與「已完成」篩選待辦事項。
- 清單或篩選結果為空時，顯示對應提示文字。
- 支援淺色與深色模式切換。
- 使用者手動切換的主題偏好會被保存，重新整理後仍會保留。
- 沒有手動設定時，會跟隨作業系統的深淺色偏好。
- 待辦資料保存於瀏覽器 `localStorage`，重新整理後資料仍會保留。
- 具備響應式版面，可支援手機螢幕。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架、外部套件或 CDN。
- 使用 CSS 變數集中管理介面配色。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。
- 透過原生 DOM API 建立與更新待辦項目。

## 開發方式

- 使用 GitHub Copilot Agent Mode 根據需求建立與修改多個前端檔案，並透過瀏覽器實際驗證功能。
- 使用 Microsoft Learn MCP 查詢 `prefers-color-scheme` 與深色模式色彩對比等官方建議。
- 使用 GitHub MCP／GitHub 工具讀取 issue，依 issue 內容規劃與實作功能。
- 使用 `.github/prompts` 中的 agentic workflow，將「讀取 issue、提出計畫、修改檔案、驗證並建立 Pull Request」整理成可重複執行的流程。
- 透過 Git 分支、commit 與 Pull Request 管理功能變更。

## 我學到什麼

- 如何使用 Agent Mode 將自然語言需求拆解成可執行的前端工作。
- 如何以 CSS 變數與 `prefers-color-scheme` 設計可切換的主題。
- 如何使用 `localStorage` 保存使用者資料與介面偏好。
- 如何透過 MCP 連接官方文件與 GitHub issue，取得開發所需的上下文。
- 如何把重複的 issue 修正流程整理成 agentic workflow，並搭配 Git 分支與 Pull Request 驗證變更。
