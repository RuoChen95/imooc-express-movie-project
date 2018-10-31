var Movie = require('../models/movie')
var Category = require('../models/category')

exports.index = function (req, res) {
  console.log('user in session: ', req.session.user)

  Category
    .find()
    .populate({path: 'movies', options: {limit: 20}})
    .exec(function (err, categories) {
      if (err) {
        console.log(err)
      }
      console.log('----')
      console.log(categories)
      res.render('index', {
        title: '电影首页',
        categories: categories
      })
    })
}

exports.search = function (req, res) {
  console.log('user in session: ', req.session.user)

  var catId = req.query.cat
  var page = Number(req.query.p)

  var count = 1
  var index = page * count

  Category
    .find({
      _id: catId
    })
    .populate({
      path: 'movies',
      select: 'title poster',
    })
    .exec(function (err, categories) {
      if (err) {
        console.log(err)
      }
      var category = categories[0] || []
      var movies = category.movies || {}
      var results = movies.slice(index, index + count)

      res.render('results', {
        title: 'imooc 结果列表页面',
        keyword: category.name,
        currentPage: page + 1,
        query: 'cat=' + catId,
        totalPage: Math.ceil(movies.length / count),
        movies: results,
      })
    })
}