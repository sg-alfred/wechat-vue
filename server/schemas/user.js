/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

// import mongoose from 'mongoose'

const mongoose = require('mongoose')

const schema = mongoose.Schema

const USER_SCHEMA = {
    wechatno: {     // 微信号，不是最开始需要创建的
        type: String,
        // unique: true,
        trim: true      // 去空格
    },
    nickname : {
        type: String,
        // required : true,    // 必填
        // unique: true        // 唯一索引！
    },
    firstname: String,
    lastname: String,
    salt: {         // 密码掩码
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    mobilephone: {          // 支持使用电话号码登录
        type: Number,
        unique: true
    },
    email : String,
    age : {
        type : Number,
        default : 0
    },
    gender: {           // 性别
        type: Number,
        default: 0,      // 0,未知；1,男；2,女
        enum: [0, 1, 2]
    },
    headimgurl: {
        type: String,
        // 自定义修饰
        set: function(url) {
            if (!url) return ;
            if (0 !== url.indexOf('http://') && 0!== url.indexOf('https://')) {
                url = 'http://' + url;
                return url;
            }
        },
        get: function (url) {
            if (!url) return ;
            if (0 !== url.indexOf('http://') && 0!== url.indexOf('https://')) {
                url = 'http://' + url;
                return url;
            }
        }
    },         // 头像地址，再说
    country: String,
    provice: String,
    city: String,
    whatsup: String,
    deleted : {
        type : Boolean,
        default: false
        // enum : [true, false]    // 枚举值～
    },
    createtime : Date,
    updatetime: {
        type: Date,
        default: Date.now
    }
}

const UserSchema = schema(USER_SCHEMA);

// 设置虚拟属性
UserSchema.virtual('fullname').get(function() {
    return this.firstname + " " + this.lastname;
})

// 设置 转化为 JSON格式时 虚拟属性值也可以导出
UserSchema.set('toJSON', {getters: true, virtual: true})

// 静态方法

// 唯一查找，其实应该是要合并的！
UserSchema.static.findOneByField = (field, cb) => {
    // 这个 json 的键值如何 也设置成为变量？
    this.findOne({wechatno: field, deleted: false}, (err, doc) => {
        cb(err, doc)
    })
}

// 根据微信号查询
UserSchema.static.findByWechatno = (wechatno, cb) => {
    this.findOne({wechatno: wechatno, deleted: false}, (err, doc) => {
        cb(err, doc)
    })
}

// 根据手机号查询！这个也是做过判断的 —— 如果时 11为数字，我才用 手机号查询 —— 并不会模糊查询
UserSchema.static.findByMobilephone = (mobilephone, cb) => {
    this.findOne({mobilephone: mobilephone, deleted: false}, (err, doc) => {
        cb(err, doc)
    })
}


UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createtime = this.updatetime = Date.now()
    } else {
        this.updatetime = Date.now()
    }
    next()

    // 掩码～
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //     if (err) return next(err)
    //
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) return next(err)
    //         user.password = hash
    //         next()
    //     })
    // })
})

// 中间件

// module.exports = mongoose.model('User', UserSchema)

// export default User

module.exports = UserSchema

// 这些全部外部的来干！
// let User = mongoose.model('User', UserSchema)

// let user1 = new User({
//     nickname: 'chenjz',
//     firstname: 'chen',
//     lastname: 'alfred'
// });
// console.log('全名：', fullname)
// console.log('JSON: ', JSON.stringify(user1));
