let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
});

// test 就是 数据库，但是，表（集合）在哪？？
// 首先～，

// 好吧，它建了一个 叫做 ‘books’ 的集合！！ books！！

// 验证是否 连接成功？
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//     // yay!
//     console.log('connect success');
// });

let UserSchema = mongoose.Schema({
    username: String,
    gender: String
})


// Schema, 数据结构
let BookSchema = mongoose.Schema({
    title : String,
    author : {
        // mongoose.Schema.ObjectId，这个是把整个都插进去了；而下面，就是一个 id ，这才是想要的！
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publishTime : {
        type: Date,
        default : Date.now
    }
});

// 建立 schema 级别的索引！！
// BookSchema.index({'title': 1, 'author': 1}, {'unique': true})


// Model
mongoose.model('User', UserSchema)
mongoose.model('Book', BookSchema)

