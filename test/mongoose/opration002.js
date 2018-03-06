const assert = require('assert')

var mongoose = require('mongoose')
require('./testconnect.js')

var User = mongoose.model('User')
var Book = mongoose.model('Book')

User.findOne({'username': 'chenjz003'}, function (err, userinfo) {
  if (err || !userinfo) {
    console.log('find failed: ', err, userinfo)
    return false
  }

  console.log(userinfo)

    // 根据查到的 来设置！
  var book = new Book({
    'title': 'C',
    author: userinfo
  })

  console.log(book)

  book.save(function (err, doc) {
    if (err) {
      console.log('save Book failed!', err)
      return false
    }

        // 要 关联查询！！不然就不能够 展示出 user的 信息！
        // Book.findOne({'title': 'C#'}, function(err, doc) {
        //     console.log('err, doc: ', err, doc);
        // })

    Book.find({'title': 'C#'}).populate('author').exec(function (err, doc) {
      console.log('err, doc: ', err, doc)
    })
  })
})
