const assert = require('assert');

var mongoose = require('mongoose');
require('./testconnect.js');

var User = mongoose.model('User');
var Book = mongoose.model('Book');

var user = new User({
    username: 'guojy',
    gender: 'male'
})

// 如何脱离这种强绑定，因为 我的 author可能想要之后再 填写进去，
// 就像微信里的聊天室。需要 A->B，还需要B同意！！这样才会有聊天室
var book = new Book({
    title : 'javascript',
    author : user
    // publishTime : new Date()
});

user.save(function(err) {
    if (err) {
        return console.log('save user failed: ', err)
    }

    book.save(function(err) {
        if (err) {
            return console.log('save book failed', err)
        }
        // console.log('save status: ' , err ? 'failed' : 'succeed');

        // Book.find({'title': 'mongoose'}, function(err, doc) {
        //     console.log('err, doc: ', err, doc);
        // })

        // 开始的时候用了 findOne，是的，是可以，但是 怎么去。。
        Book.findOne({'title': 'javascript'}).populate('author').exec(function(err, doc) {
            console.log('err, doc: ', err, doc);
        })
    });
})

// 数据库里面的数据是！
// { "_id" : ObjectId("597d9d78972dea40b407e906"), "title" : "mongoose", "author" : ObjectId("597d9d78972dea40b407e905"), "publishTime" : ISODate("2017-07-30T08:48:56.131Z"), "__v" : 0 }

// 打印出来后！

// err, doc:  null { _id: 597d9d78972dea40b407e906,
//   title: 'mongoose',
//   author:
//    { _id: 597d9d78972dea40b407e905,
//      username: 'chenjz005',
//      gender: 'male',
//      __v: 0 },
//   __v: 0,
//   publishTime: 2017-07-30T08:48:56.131Z }

// var userPromise = user.save()

// assert.ok(userPromise instanceof require('mpromise'));

// userPromise.then(() => {

//     var bookPromise = book.save();
    
//     assert.ok(bookPromise instanceof require('mpromise'));

//     bookPromise.then(() => {
//         var bookQuery = book.findOne({'title': 'mongoose'});

//         var queryPromise = bookQuery.exec();

//         queryPromise.then( (doc) => {
//             conosle.log('success: ', doc);
//         })
//     })
// })
// .catch({
//     if (err) {
//         console.log('save failed: ', err)
//     }
// })


