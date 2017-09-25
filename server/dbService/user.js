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

const UserModel = global.dbHandel.getModel('User');

let userDbUtil = {};

// 保存用户
userDbUtil.createWxuser = async (params) => {

    // 实例化
    let user = new User(params)
    // console.log('数据库层！--', user)

    // 如何使用？
    try {
        await user.save();

    } catch (err) {

    }

    return new Promise((resolve, reject) => {

        // 先找！！然后再 看是否插入？ -- 没有必要！
        user.save((err, doc) => {
            console.log('注册结果', err, doc)   // 有结果，但是没有回调回去！！
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

// 根据手机号码查询，这样的话，确实没有必要 再这样一层！！ 因为 对数据库操作太简单了！两句话的事。。

// 根据特定的字段查找，这个应该 不能这么写！

// 或许只要 findOneByMobile 就搞定了！

userDbUtil.getWxuserByMobile = async (mobile, deleted = false) => {

    let userinfo = await UserModel.findOne({'mobilephone': mobile, deleted})

    console.log()

    return new Promise((resolve, reject) => {
        User.findOne({'mobilephone': mobile, deleted}, (err, doc) => {
            console.log('查询结果', err, doc)
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

// 注册时,查找用户，判别是否 用户名重复
userDbUtil.getUserByRegister = (email, nickname) => {

}

module.exports = userDbUtil

