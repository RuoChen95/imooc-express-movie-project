var Comment = require('../models/comment')

exports.save = function(req, res) {
  var commentObj = req.body.comment
  var movieId = commentObj.movie
  var _comment = new Comment(commentObj)

  _comment.save(function(err, comment){
    if (err) {
      console.log(err)
    }
    res.redirect('/movie/'+ movieId)
  })
}