# CICD_Deploy
自动部署前端项目（react+mui）

容易踩坑注意点：
- 1、部署完已经生成了地址，但是点开是`404，page not found`：package中build的路径 和 .yml文件中【publish_dir: ./dist】的路径不一致，如果项目生成的目录名不是 dist（比如 build、out），那么 peaceiris/actions-gh-pages 就会推送一个空目录（结果只有 .nojekyll）； 解决方案：修改 .yml文件 `publish_dir: ./build`。
- 2、URL可以访问了，不是404，是空白的，控制台报错：这是典型的 GitHub Pages 路径问题，尤其是 Vue、React、Vite 等 SPA 项目第一次部署时特别容易踩坑。

