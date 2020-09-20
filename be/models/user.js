/**
 * Created by chenjz on 2017/7/30.
 */
'use strict';

import mongoose from 'mongoose';
const schema = mongoose.Schema;

const USER_SCHEMA = {
  wechatno: {
    // 微信号，不是最开始需要创建的, 6-20，必须以字母开头
    type: String,
    // unique: true,
    trim: true, // 去空格
  },
  alias: String, // 自己设置的昵称
  firstname: String,
  lastname: String,
  salt: {
    // 密码掩码
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobilephone: {
    // 支持使用电话号码登录
    type: Number,
    unique: true,
  },
  face: {
    type: Boolean,
    default: false,
  },
  email: String,
  age: {
    type: Number,
    default: 0,
  },
  gender: {
    // 性别
    type: Number,
    default: 0, // 0,未知；1,男；2,女
    enum: [0, 1, 2],
  },
  headimgurl: {
    type: String,
    default: 'static/image/headimg/default.png',
    // 自定义修饰
    /* set: function(url) {
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
        } */
  }, // 头像地址，再说
  country: String,
  provice: String,
  city: String,
  whatsup: String,
  deleted: {
    type: Boolean,
    default: false,
    // enum : [true, false]    // 枚举值～
  },
  createtime: Date,
  updatetime: {
    type: Date,
    default: Date.now,
  },
};

const UserSchema = schema(USER_SCHEMA);

// 设置虚拟属性
UserSchema.virtual('fullname').get(function () {
  return this.firstname + ' ' + this.lastname;
});

// 设置 转化为 JSON格式时 虚拟属性值也可以导出
UserSchema.set('toJSON', { getters: true, virtual: true });

// 静态方法

// 唯一查找，其实应该是要合并的！
UserSchema.static.findOneByField = (field, cb) => {
  // 这个 json 的键值如何 也设置成为变量？
  this.findOne({ wechatno: field, deleted: false }, (err, doc) => {
    cb(err, doc);
  });
};

//
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createtime = this.updatetime = Date.now();
  } else {
    this.updatetime = Date.now();
  }
  next();
});

UserSchema.pre('update', function (next) {
  this.updatetime = Date.now();
});

// 中间件

const User = mongoose.model('User', UserSchema);

export default User;

// 这些全部外部的来干！
// let User = mongoose.model('User', UserSchema)

// let user1 = new User({
//     nickname: 'chenjz',
//     firstname: 'chen',
//     lastname: 'alfred'
// });
// console.log('全名：', fullname)
// console.log('JSON: ', JSON.stringify(user1));
