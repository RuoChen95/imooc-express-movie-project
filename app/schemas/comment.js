var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new mongoose.Schema({
    // mongoose 内建的populate方法，用于引用不同表的数据
    movie: {
        type: ObjectId,
        ref: 'Movie'
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    to: {
        type: ObjectId,
        ref: 'User'
    },
    content: String,
    // 回复
    reply: [
        {
            from: {
                type: ObjectId,
                ref: 'User'
            },
            to: {
                type: ObjectId,
                ref: 'User'
            },
            content: String,
        }
    ],
    // 录入数据的时间记录
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});


// 每次存储数据之前，都调用一下这个方法
CommentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }

    next();
});

CommentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = CommentSchema;