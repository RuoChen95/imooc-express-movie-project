# imooc-express-movie-project
课程 https://www.imooc.com/video/1092 代码，跑通

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
课程 https://coding.imooc.com/lesson/95.html#mid=3163 代码 跑通

### todo-list
1. 实现静态资源的获取
