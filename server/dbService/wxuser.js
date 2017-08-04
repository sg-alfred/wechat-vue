/**
 * 微信用户的 数据库操作层
 *
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// var mongoose = require('mongoose');

// const connection = require('./dbHandle')
const User = require('../models/wxuser')

// 获取 User model？？
// const User = mongoose.model(UserModel)

// import User from '../models/wxuser'

let userDbUtil = {};

// 保存用户
userDbUtil.createWxuser = (params) => {

    console.log('数据库层！', params)
    // 实例化
    let user = new User(params)

    return new Promise((resolve, reject) => {
        console.log(err, doc)
        user.save((err, doc) => {
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
        User.findOne({'mobilephone': mobile, 'deleted': deleted}, (err, doc) => {
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

