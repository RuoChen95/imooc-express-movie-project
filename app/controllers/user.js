var User = require('../models/user')

exports.signup = function(req, res) {
  // req.param('user')
  var _user = req.body.user

  User.findOne({name: _user.name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/')
    } else {
      var user = new User(_user)

      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        console.log('注册成功')
        res.redirect('/admin/userlist')
      })
    }
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
      return res.redirect('/')
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