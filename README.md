# imooc-express-movie-project
课程 https://www.imooc.com/video/1092 代码，跑通

目的：打通前后端开发流程

环境：Express 4.x

和课程源码相比，使用了更新的模块，代码的细节上也有不同

```
sudo mongod
```

```
sudo mongo

> use imooc
```

```
npm install

bower install

node app.js
```

### 二期功能列表

1. 用户注册登录以及权限管理
2. 电影的评论
3. 电影的分类
4. 搜索
5. 用户行为的统计
6. 单元测试
7. Grunt功能集成

### bug-list
1. 当登录的时候故意输入错误的密码，会跳到空白页面，报错：“Cannot GET /user/signin”(done)
2. mongoose数据处理：populate以及嵌套的区别和联系，电影下其类型的更新有问题(done)

### todo-list
1. 图片异步方式上传而非引入中间件的方式，以节省时间

---

# imooc服务端部署相关
课程 https://coding.imooc.com/learn/list/95.html 代码 跑通

目的：打通本地到线上的发布流程，了解从开发到生产环境的操作方式

工具：PM2

```
// 本机环境

pm2 deploy ecosystem.json production
```

```
// 服务端环境

pm2 start app.js
```

### 项目的线上代码
http://39.105.177.205:3000/

### bug-list
1. 实现正确的静态资源获取方式（目前通过引用官方link）

### todo-list
1. 配置域名，域名备案，为域名增加ssl证书
2. 增强安全防护
