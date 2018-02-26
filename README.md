#takingtaxi

## 上手应用
### 安装依赖
```shell
npm install
```
### 运行项目
```shell
npm run dev
```
### 将项目指向 dist

## 注意事项
+ 请添调整 npm 仓库指向 http://47.94.138.91:7001/
```shell
  nrm add jt http://47.94.138.91:7001/
  nrm use jt
```
+ 请关闭 ES6 转 ES5；上传样式补全；代码上传压缩
+ 因采用了 (minui)[https://meili.github.io/min/] 故请根据提示使用 min install xxx 进行安装 ui 组件（前提 npm install -g @mindev/min-cli）

## 数据上报采用阿拉丁
+ 拷贝阿拉丁文件（report 文件下）
+ 申请 阿拉丁 key
+ 完成如下操作

app.js
```javascript
import report from './report/ald-stat';
```
ald-stat-conf.js
```javascript
exports.app_key = "5a9db3bda387b0093cd7286be4ec78eb"; // 阿拉丁 key
```