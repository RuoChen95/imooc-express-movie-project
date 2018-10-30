var Category = require('../models/category')

// 电影数据的新建页
exports.new = function(req,res) {
  res.render('category', {
    title: 'imooc 后台分类录入页',
    category:{
      name: "",
      category: {}
    },
  })
}

exports.save = function(req,res){
  var categoryObj = req.body.category;
  var _category = null


  _category = new Category({
    name: categoryObj.name,
  })

  _category.save(function(err,category){
    if (err) {
      console.log(err)
    }
    res.redirect('/admin/category/list')
  })
}


exports.list = function(req,res) {
  Category.fetch(function(err,categories){
    if(err){
      console.log(err)
    }
    res.render('categorylist',{
      title:'imooc 分类列表页',
      categories: categories
    })
  })
}