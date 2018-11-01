var crypto = require('crypto')
var bcrypt = require('bcrypt')

function getRandomString(len) { // 工具函数
  if (!len) len = 16

  return crypto.randomBytes(Math.ceil(len/2)).toString('hex')
}


var should = require('should') // should插件
var app = require('../../app') // 入口
var mongoose = require('mongoose') // 数据库
var User = mongoose.model('User')

var user

// 测试用例
describe('<Unit Test>', function() {
  describe('Model User:', function() {
    // 测试用例跑之前的操作
    before(function (done) {
      user = {
        name: getRandomString(),
        password: 'password'
      }

      done()
    })

    describe('Before Method save', function () {
      it('should begin without user', function (done) {
        User.find({name: user.name}, function (err, users) {
          users.should.have.lengthOf(0) // 只有用户不存在，才能进入接下来的测试，否则直接报错跳出

          done()
        })
      })
    })

    describe('User save', function () {
      //确定保存的时候没有问题
      it('Should save without problems', function (done) {
        var _user = new User(user)

        _user.save(function (err) {
          should.not.exist(err)
          _user.remove(function (err) {
            should.not.exist(err)
            done()
          })
        })
      })

      //确定保存的时候没有问题
      it('Should password be hashed correctly', function (done) {
        var password = user.password
        var _user = new User(user)

        _user.save(function (err) {
          should.not.exist(err)

          _user.password.should.not.have.length(0)

          bcrypt.compare(password, _user.password, function (err, isMatch) {
            should.not.exist(err)
            isMathch.should.equal(true)
          })

          _user.remove(function (err) {
            should.not.exist(err)
            done()
          })
        })
      })

      it('Should have default role 0', function (done) {
        var password = user.password
        var _user = new User(user)

        _user.save(function (err) {
          _user.role.should.equal(0)

          _user.remove(function (err) {
            should.not.exist(err)
            done()
          })
        })
      })

      it('Should fail to save an existing user', function (done) {
        var _user1 = new User(user)
        _user1.save(function (err) {
          should.not.exist(err)

          var _user2 = new User(user)
          _user2.save(function (err) {
            should.exist(err)

            _user1.remove(function (err) {
              if (!err) {
                _user2.remove(function (err) {
                  if (!err) {
                    done()
                  }
                })
              }
            })
          })
        })
      })
    })

    // 测试用例跑完后的操作
    after(function (done) {
      done()
    })
  })
})