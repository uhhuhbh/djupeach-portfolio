# 作品集网站更新说明

当前线上版本是完整静态站点，不需要 Node.js、Vite 或构建工具。

- `works.js`：电影/影像项目、职位、器材、静帧及顺序。
- `media.js`：摄影墙、封面轮播、摄影预览与原图路径。
- `index.html`：页面文字与结构。
- `styles.css`：视觉样式。
- `app.js`、`experience.js`：交互。
- `assets/`：图片和字体。

新增素材时，保留文件夹结构并确保 `works.js` 或 `media.js` 中引用的路径与文件名一致。推送到 `main` 后 GitHub Actions 自动更新网站。

视频建议继续独立托管于公开视频平台或对象存储，再将播放链接嵌入网站；不要把大体积视频提交进 GitHub 仓库。
