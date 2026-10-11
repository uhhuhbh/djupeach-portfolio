# GitHub Pages 发布准备

网站是 Vite 静态站点。`.github/workflows/deploy.yml` 已配置为：将来把网站更新推送到 `main` 后，GitHub Actions 自动安装依赖、构建 `dist/`，并发布到 GitHub Pages。

## 目前状态

- 仓库已创建，GitHub Pages 发布来源已设为 GitHub Actions。
- 目前只放了部署配置和交接说明；没有上传网站源文件、文案或图片，也没有设置自定义域名或改动 DNS。
- 目标自定义域名：`www.djupeach-portfolio.xyz`。
- 免费 GitHub Pages 需要使用公开仓库；公开仓库中的源代码和图片也可被他人下载。

## 等作品集内容定稿后

1. 确认要公开到 GitHub 的文案、项目图片和联系信息。
2. 推送网站源文件与图片到本仓库。
3. 首次工作流成功后，先检查 GitHub 分配的默认网址。
4. 在 Pages 设置中填写 `www.djupeach-portfolio.xyz`，然后按 GitHub 显示的目标值设置域名 DNS。当前域名还指向阿里云，等新站点确认可用后再切换，避免提前影响现有访问。
5. GitHub 验证域名并签发 HTTPS 证书后，再打开强制 HTTPS。

GitHub Pages 支持自定义域名和 HTTPS。DNS 切换后，国内网络是否稳定访问 GitHub Pages 仍需实际测试；若国内访问稳定性优先，阿里云国内节点仍更合适。
