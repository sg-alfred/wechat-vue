var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
});

// 需要密码的话：
// mongoose.connect('mongodb://readonly:ht2A605mongo@121.40.140.196:30000/orderdb');

// 正式太危险，虽然就只是 find！！但还是 不要！！
// 可以拿测试 练手～

// test 就是 数据库，但是，表（集合）在哪？？
// 首先～，

// 好吧，它建了一个 叫做 ‘books’ 的集合！！ books！！

// 验证是否 连接成功？
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//     // yay!
//     console.log('connect success');
// });

var UserSchema = mongoose.Schema({
    username: String,
    gender: String
})


// Schema, 数据结构
var BookSchema = mongoose.Schema({
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
mongoose.model('Book', BookSchema);

