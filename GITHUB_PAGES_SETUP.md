# GitHub Pages 部署

- 仓库：`uhhuhbh/djupeach-portfolio`（公开仓库）
- Pages 来源：GitHub Actions
- 自定义域名：`www.djupeach-portfolio.xyz`（已保存到 Pages 设置）
- 部署包：根目录的 `index.html`、五个 JS/CSS 文件和 `assets/`；Actions 组装 `_site/` 后发布。
- 自动触发：向 `main` 推送站点文件、`assets/**` 或部署工作流的改动。

GitHub Pages 的自定义 HTTPS 证书要等 DNS 正确指向 GitHub Pages 并完成签发。DNS 当前仍指向旧的阿里云香港站点，切换记录后需等 DNS 缓存更新和证书状态就绪，再验证 `https://www.djupeach-portfolio.xyz`。
