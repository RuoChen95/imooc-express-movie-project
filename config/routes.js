var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')
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
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

  app.get('/signin', User.showSignin) // 登录页面
  app.get('/signup', User.showSignup) // 注册页面


  app.get('/movie/:id', Movie.detail) // 详情页
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new) // 电影数据的新建页
  app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save) // 电影数据的存储
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update) // 电影数据的更新页
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del) // 电影数据的删除
  
  // comment
  app.post('/user/comment', User.signinRequired, Comment.save)

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}