var Movie = require('../models/movie')
var Category = require('../models/category')
var Comment = require('../models/comment')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')

// 详情页
exports.detail = function(req,res) {
  var id = req.params.id
  Movie.findById(id,function(err,movie){

    Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
      if (err) {
        console.log(err)
      }
    })

    // 使用回调的方式来获取movieId所对应的comment
    Comment
      .find({movie: id}) // 通过id找到这个电影的评论数据
      .populate('from', 'name') // 通过populate找到评论的userName，返回name这个数据
      .populate('reply.from reply.to', 'name') // 通过populate找到评论的userName，返回name这个数据
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
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie:{},
    })
  })
}

// 电影数据的更新页（显示接口）
// 更新页和新建页复用了
exports.update = function(req,res){
  var id = req.params.id
  if(id){
    Movie.findById(id,function(err, movie){

      Category.find({}, function(err, category) {
        res.render('admin',{
          title:'imooc 后台更新页',
          movie: movie,
          categories: category,
        })
      })

    })
  }
}

// 电影数据的存储（POST接口）
exports.save = function(req,res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie = null;

  if (req.poster) {
    movieObj.poster = req.poster
  }

  // 更新
  if (id) {
    Movie.findById(id, (err,movie)=>{
      if (err) {
        console.log(err);
      }

      // 删除category中的movie类
      var ShouldDeletedCategoryId = movie.category

      _movie = _.extend(movie, movieObj);

      var ShouldAddedCategoryId = movie.category
      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        };

        Category.findById(ShouldDeletedCategoryId, function(err, category) {

          var movieIndex = category.movies.indexOf(movie._id)

          if (movieIndex !== -1) {
            category.movies.splice(movieIndex, 1)

            category.save(function(err, category) {

              Category.findById(ShouldAddedCategoryId, function(err, category) {
                category.movies.push(movie._id)

                category.save(function(err, category) {
                  res.redirect('/movie/' + movie._id)
                })
              })
            })
          } else {
            res.redirect('/movie/' + movie._id)
          }
        })
      })
    })
  }

  else{
    // 增加
    _movie = new Movie(movieObj)

    var catId = _movie.category

    // 由于_movie这个类中并没有categoryName这个类，所以不能用_movie.categoryName（否则会返回undefined）
    var catName = movieObj.categoryName
    // 先储存movie
    _movie.save(function(err,movie){
      if (err) {
        console.log(err)
      }

      // 储存成功后处理category
      // 通过当前的catId来拿到此id对应的分类，然后存到category表中
      if (catId) {
        Category.findById(catId, function(err, category) {
          category.movies.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        })
      } else if (catName) {
        // console.log(movie.id)
        var category = new Category({
          name: catName,
          movies: [movie._id],
        })



        category.save(function(err, category) {
          movie.category = category._id

          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }
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

// 中间件
// 存储海报功能
exports.savePoster = function(req, res, next) {
  var posterData = req.files.uploadPoster
  console.log(posterData)
  var filePath = posterData.path // 服务器缓存路径
  var originalFilename = posterData.originalFilename

  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = posterData.type.split('/')[1]
      var poster = timestamp + '.' + type

      // 生成服务器存储地址
      var newPath = path.join(__dirname, '../../public/upload/' + poster)

      fs.writeFile(newPath, data, function(err) {
        req.poster = poster
        next()
      })
    })
  } else {
    next()
  }
}