# Chatup -- 招聘聊天应用

# 技术栈

- [x] react 构建前端页面架构
- [x] antd-mobile 蚂蚁金服的UI库
- [x] es6 服务端与客户端皆用es6语法，本地环境使用babel-node解析
- [x] babel 将代码转换es5
- [x] react-router4 路由管理
- [x] redux 实现组件之间的状态管理
    - [x] redux-thunk 提供redux异步操作
- [x] react-redux 连接react与redux，让redux使用起来跟方便。
- [x] axios 基于 `Promise` 的 http 库
- [x] express 服务端
- [x] cookie-parser 操作cookit
- [x] socket.io 实现实时聊天功能
- [x] webpack 打包工具
- [x] pm2 使用ecosystem一键部署环境
- [x] nginx 反向代理
- [x] mongodb 非关系型数据库

# 实现功能

- [x] 在线聊天
- [x] 浏览Boss/genius用户列表
- [ ] 实时在线人数
- [ ] 添加好友
- [ ] ......

# 应用图片

![images01](https://raw.githubusercontent.com/7zf001/mine/master/images/shotimges01.png)
![images02](https://raw.githubusercontent.com/7zf001/mine/master/images/shotimages02.png)
![images03](https://raw.githubusercontent.com/7zf001/mine/master/images/shotimages03.png)

# 开发阶段

  使用 create-create-app 初始应用，运行 npm run eject 将配置等文件获取到。

  在 window 下安装 mongodb，并将mongodb的文件夹路径放入环境变量中，我使用的命令行工具是cmder，
在命令行中输入mongo即可，详情安装可看[mongodb安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

  开始写我们的业务代码，我将项目路径规划成

```
.
+-- config
+-- public
+-- scripts
+-- server
+-- src
|  +-- components 页面组件
|  +-- container 页面容器
|  +-- iconfont antd 字体
|  +-- store redux状态管理
|  +-- app.js 主组件
|  +-- config.js axios配置
|  +-- index.js 
|  +-- util.js 工具库
+-- .babelrc
+-- .gitgnore
+-- cmrh.conf.js 服务端渲染加载css hook
+-- package.json
+-- README.md
```