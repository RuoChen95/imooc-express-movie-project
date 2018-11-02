var User = require('../models/user')

exports.signup = function(req, res) {
  // req.param('user')
  var _user = req.body.user

  User.findOne({name: _user.name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/signin')
    } else {
      var user = new User(_user)

      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        console.log('注册成功')
        res.redirect('/')
      })
    }
  })
}

exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  })
}
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

// 登录
exports.signin = function(req,res) {
  var _user = req.body.user

  var name = _user.name
  var password = _user.password

  // 使用User.find是无用的
  User.findOne({name: name}, function (err, user) {
    if (err) {
      console.log(err)
    }

    if (!user) {
      return res.redirect('signup')
    }

    // 实例方法
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        req.session.user = user
        console.log('登录成功')
        return res.redirect('/')
      } else {
        console.log('Password is not matched')
        return res.redirect('/signin')
      }
    })
  })
}

// 登出
exports.logout = function(req, res) {
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}

// userlist
exports.list = function(req,res) {
  var user = req.session.user

  if (!user) {
    console.log('user:', typeof(user))
    console.log('没有获取到req.session.user')
    return res.redirect('/signin')
  }

  if (user.role > 10) {
    User.fetch(function(err,users){
      if(err){
        console.log(err)
      }
      res.render('userlist',{
        title:'imooc 列表页',
        users: users
      })
    })
  }
}

exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if (!user) {
    console.log('用户未登录')
    return res.redirect('/signin')
  }

  next()
}

exports.adminRequired = function(req, res, next) {
  var user = req.session.user
  
  if (!user || user.role <= 10) {
    console.log('用户未登录或者用户权限小于管理员')
    return res.redirect('/signin')
  }

  next()
}