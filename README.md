# japan-trip

這是一個東京七日遊的行程規劃網頁，行程內容以 JSON 格式儲存，並透過 JavaScript 動態呈現在網頁上。

## 檔案結構
- `index.html`: 網頁主檔案。
- `style.css`: 網頁樣式表。
- `script.js`: 負責讀取 `itinerary.json` 並生成行程內容的 JavaScript 檔案。
- `itinerary.json`: 包含詳細行程規劃的 JSON 資料檔案。
- `itinerary_plan.md`: 行程規劃的 Markdown 版本 (僅供參考)。
- `itinerary.yaml`: 原始的 YAML 行程檔案 (已不再被網頁使用)。

## 如何部署到 GitHub Pages

您可以將此專案部署到 GitHub Pages，讓您的行程規劃可以在網路上公開瀏覽。

1.  **初始化 Git 倉庫**：
    在您的專案根目錄中打開終端機，執行以下命令：
    ```bash
    git init
    ```

2.  **添加檔案到暫存區**：
    ```bash
    git add .
    ```

3.  **提交變更**：
    ```bash
    git commit -m "Initial commit: Tokyo Itinerary Website"
    ```

4.  **創建 GitHub 倉庫並連結**：
    在 GitHub 上創建一個新的空倉庫（例如 `japan-trip`）。然後將本地倉庫連結到遠端倉庫：
    ```bash
    git remote add origin <您的GitHub倉庫URL>
    ```
    例如：`git remote add origin https://github.com/您的用戶名/japan-trip.git`

5.  **推送到 GitHub**：
    ```bash
    git push -u origin master
    ```
    （如果您的預設分支是 `main`，請使用 `git push -u origin main`）

6.  **啟用 GitHub Pages**：
    進入您的 GitHub 倉庫設定 (Settings) -> Pages，選擇 `master` 或 `main` 分支作為來源，並儲存。稍等片刻，您的行程網頁就會在提供的 URL 上線。

**您的行程網頁預計將會在此處顯示：**
[https://nyannnya.github.io/japan-trip/](https://nyannnya.github.io/japan-trip/)

希望這份行程規劃和網頁能幫助您享受美好的東京之旅！