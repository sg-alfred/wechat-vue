/**
 * 微信用户的 数据库操作层
 *
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// 获取连接？
// const connection = require('./dbHandle')

// 获取 User model？？
// const User = mongoose.model(UserModel)

// import User from '../models/wxuser'

// const User = global.dbHandel.getModel('User');
const User = global.dbHandel.getModel('User');

let userDbUtil = {};

// 保存用户
userDbUtil.createWxuser = (params) => {

    // 实例化
    let user = new User(params)
    console.log('数据库层！--', user)

    return new Promise((resolve, reject) => {
        user.save((err, doc) => {
            console.log(err, doc)   // 有结果，但是没有回调回去！！
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

// 根据手机号码查询
userDbUtil.getWxuserByMobile = (mobile, deleted) => {
    deleted = deleted | false

    return new Promise((resolve, reject) => {
        User.findOne({'nickname': mobile, 'deleted': deleted}, (err, doc) => {
            console.log(err, doc)
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

// 注册时,查找用户
userDbUtil.getUserByRegister = (email, nickname) => {

}

module.exports = userDbUtil

