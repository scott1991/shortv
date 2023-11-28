# ShortV App 說明文件

ShortV App 是一個用於播放短影片的網頁App，支援 HLS 格式的影片播放。包含三個主要component：`Main`, `ShortsContainer`, 和 `Short`

## 主要Component

### `Main`

- 利用 React `useState` 和 `useEffect` 來從server取得兩個影片列表`following` 和 `forYou`
- 提供 Tab 切換功能，可以在 "Following" 和 "For You" 之間切換。
- 記錄使用者在每個列表中的滾動位置和影片播放進度。

### `ShortsContainer`

- 用於顯示 `Short` Component 的列表。
- 處理onScroll事件並將滾動位置和影片播放進度傳遞給 `Main` 
- 使用 `useEffect` 來設定初始滾動位置。

### `Short`

- 顯示單個圖片/影片。
- 使用 `Intersection Observer API` 來檢測當前影片是否在可視範圍內，並根據此來控制影片的播放。
- 使用 `hls.js` 來處理 `.m3u8` 影片的播放，相容不原生支援 HLS 的瀏覽器。// 以前曾經桌面瀏覽器也原生支援

## CSS

- 主要利用 `scroll-snap-type: y mandatory;` `scroll-snap-align: end;` 來達成滑動停駐的效果

## 設定文件

- `setting.js`：Server ip / port
