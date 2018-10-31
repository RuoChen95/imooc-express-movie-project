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