var mongoose = require('mongoose');

// 引入 模式 这个文件
var MovieSchema = require('../schemas/movie');

// 变异生成movie这个模型
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;