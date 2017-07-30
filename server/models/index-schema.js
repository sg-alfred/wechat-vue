/**
 * Created by chenjz on 2017/7/30.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wechat');

// 验证是否 连接成功？
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
    User : {
        wechatno: {     // 微信号，不是最开始需要创建的
            type: String,
            unique: true,
            trim: true      // 去空格
        },
        nickname : {
            type: String,
            required : true,    // 必填
            unique: true        // 唯一
        },
        salt: {         // 密码掩码
            type: String,
            required: true
        },
        password : {
            type : String,
            required : true
        },
        mobilephone: {          // 支持使用电话号码登录
            type: String,
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
        createtime : Date,
        updatetime: {
            type: Date,
            default: Date.now
        },
        deleted : {
            type : Boolean,
            default: false
            // enum : [true, false]    // 枚举值～
        }
    },
    contact : {
        uid : {
            type: mongoose.Schema.types.ObjectId,       // 这个应该是 用户表的主键！
            ref: 'User',        // 关联的是这个！！
            required: true,
            index: true     // 这个就是 索引了！！，但是 单个，我想要 联合索引！！
        },
        fid : {
            type: mongoose.Schema.types.ObjectId,
            ref: 'User',
            required: true
        },
        alias : String,
        description: String,
        status: {       // 0: 添加好友; 1: 已被同意; 2: 被拒绝; 3: 主动删除好友; 4: 被删除
            type: Number,
            required: true
        },
        addtime: Date,
        agreetime: Date,
        deletetime: Date,
        isshare: {      // 是否分享朋友圈信息
            type: Boolean,
            default: true
        },
        chatid: {
            type: String
        },
        cleartime: Date,        // 最后一次聊天记录清除时间
        lastmsgid: String,
        createtime : Date,
        updatetime : {
            type : Date,
            default : Date.now
        }
    }
};