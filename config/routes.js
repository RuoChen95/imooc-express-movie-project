var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var _ = require('underscore')


module.exports = function (app) {
  // 预处理用户登录情况
  app.use(function (req, res, next) {
    var _user = req.session.user

    app.locals.user = _user

    return next()
  })
  
  // 首页
  app.get('/', Index.index)
  
  // 注册
  app.post('/user/signup', User.signup)
  
  // 登录
  app.post('/user/signin', User.signin)
  
  // 登出
  app.get('/user/logout', User.logout)
  
  // userlist
  app.get('/admin/userlist', User.list)

  // 登录页面
  app.get('/signin', User.showSignin)
  // 注册页面
  app.get('/signup', User.showSignup)

  // 详情页
  app.get('/movie/:id', Movie.detail)
  
  // 电影数据的新建页
  app.get('/admin/movie', Movie.new)
  
  // 电影数据的更新页
  // 更新页和新建页复用了
  app.get('/admin/update/:id', Movie.update)
  
  // 电影数据的存储
  app.post('/admin/movie/new', Movie.save)

  app.get('/admin/list', Movie.list)

  // 电影数据的删除
  app.delete('/admin/list', Movie.del)
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}