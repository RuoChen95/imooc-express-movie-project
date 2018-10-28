var Movie = require('../models/movie')
var Comment = require('../models/comment')
var _ = require('underscore')

// 详情页
exports.detail = function(req,res) {
  var id = req.params.id
  Movie.findById(id,function(err,movie){
    // 使用回调的方式来获取movieId所对应的comment
    Comment
      .find({movie: id}) // 通过id找到这个电影的评论数据
      .populate('from', 'name') // 通过populate找到评论的userName，返回name这个数据
      .exec(function(err, comments) {
        console.log(comments)
        res.render('detail',{
          title: 'imooc ' + movie.title,
          movie: movie,
          comments: comments
        })
      })
  })
}

// 电影数据的新建页
exports.new = function(req,res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie:{
      title:"",
      doctor:"",
      country:"",
      year:"",
      poster:"",
      flash:"",
      summary:"",
      language:""
    },
  })
}

// 电影数据的更新页
// 更新页和新建页复用了
exports.update = function(req,res){
  var id = req.params.id
  if(id){
    Movie.findById(id,function(err, movie){
      res.render('admin',{
        title:'imooc 后台更新页',
        movie: movie
      })
    })
  }
}

// 电影数据的存储
exports.save = function(req,res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie = null;
  console.log(id)
  if (id) {
    Movie.findById(id, (err,movie)=>{
      if (err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj);
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        };

        res.redirect('/movie/' + movie._id);
      })
    })
  }

  else{
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
    _movie.save(function(err,movie){
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)
    })
  }
}

exports.list = function(req,res) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
      title:'imooc 列表页',
      movies: movies
    })
  })

  // res.render('list', {
  //   title: 'imooc 列表页',
  //   movies: [{
  //     title:"机械战警",
  //     _id:1,
  //     doctor:'何塞.帕迪利亚',
  //     country:"美国",
  //     year:2014,
  //     poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
  //     language:"英语",
  //     flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
  //     summary:"《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。"
  //   }]
  // })
}


// 删除
exports.del = function(req,res) {
  let id = req.query.id
  Movie.deleteOne({_id: id}, function (err,movie) {
    if (err) {
      console.log(err)
    } else {
      res.json({success: 1})
    }
  })
}