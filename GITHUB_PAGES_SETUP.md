# GitHub Pages 部署

- 仓库：`uhhuhbh/djupeach-portfolio`（公开仓库）
- Pages 来源：GitHub Actions
- 自定义域名：`www.djupeach-portfolio.xyz`
- 发布内容：网站入口文件、favicon、字体、优化后的静帧与摄影图，以及微信站长认证文件。
- 图片构建：Actions 使用 `scripts/optimize_images.py` 生成详情大图和轻量缩略图；原始素材留在 `assets/`，不进入发布包。
- 自动触发：向 `main` 推送页面、脚本、样式、`assets/**` 或部署工作流的改动。

域名的 HTTPS 由 GitHub Pages 管理。发布后检查 Pages workflow 成功、网站 HTTPS 证书有效，以及认证文件可公开访问。
