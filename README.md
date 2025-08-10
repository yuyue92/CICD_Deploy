# CICD_Deploy
自动部署前端项目（react+mui）

容易踩坑注意点：
- 1、部署完已经生成了地址，但是点开是`404，page not found`：package中build的路径 和 .yml文件中【publish_dir: ./dist】的路径不一致，如果项目生成的目录名不是 dist（比如 build、out），那么 peaceiris/actions-gh-pages 就会推送一个空目录（结果只有 .nojekyll）； 解决方案：修改 .yml文件 `publish_dir: ./build`。
- 2、URL可以访问了，不是404，是空白的，控制台报错：这是典型的 GitHub Pages 路径问题，尤其是 Vue、React、Vite 等 SPA 项目第一次部署时特别容易踩坑。解决方案：如果是 React CRA，在 package.json 里加：`"homepage": "."` 或者 `"homepage": "https://你的用户名.github.io/仓库名"`；这样生成的静态文件引用的 JS/CSS 路径就是相对路径，不会在 GitHub Pages 出现空白 + main.js 404 了。
- 3、访问某个页面，在强制刷新URL，又是404了：原因是 ` React Router 负责前端路由，所有页面其实都是由 index.html 渲染的。但当你在浏览器里强制刷新某个子路径（比如 /about）时，GitHub Pages 会去服务器找 /about/index.html，而 GitHub Pages 上并没有这个文件，就返回 404。`； 解决方案是：index.js 中改为HashRouter包裹App；或者 在 public/ 目录下新增一个 404.html【内容直接复制 index.html】；这样，当 GitHub Pages 找不到路径时，会自动返回 404.html，而它其实是 React 的入口文件，React 就会根据路由渲染正确的页面。

