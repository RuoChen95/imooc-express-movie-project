var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')(session)
var port = process.env.PORT || 3000

var dbUrl = 'mongodb://localhost/imooc'

var app = express()

// 使用本地叫imooc的数据库
mongoose.connect(dbUrl,{ useNewUrlParser: true })

// cookie解析中间件
app.use(cookieParser())
// session解析中间件
app.use(session({
  secret: 'imooc',
  store: new MongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))




app.set('views', './app/views/pages') // 更新路由
app.set('view engine', 'pug') // 模版语法

// 数据格式化为对象
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))) // 静态文件的目录
app.locals.moment = require('moment')

if (app.get('env') === 'development') {
  app.set('showStackError', true)
  app.use(morgan(':method :url :status'))
  app.locals.pretty = true

  mongoose.set('debug', true)
}

require('./config/routes')(app)

console.log('imooc started on', port)