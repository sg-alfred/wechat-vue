/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const wxuserDbUtil = require('../dbService/wxuser')
const appResponse = require('./resHandle')
const baseUtil = require('./utils/baseUtil')

module.exports = (app) => {

    // 判断用户是否登录
    app.get('/user/isLogin', (req, res) => {
        console.log('index登录否？: ', req.session.userid);
        let resultObj = {
            code: 0,
            message: req.session.userid ? '已登录' : '未登录'
        }
        appResponse(res, JSON.stringify(resultObj))
    })

    // 用户注册，如何判断验证码？
    app.post('/user/register', (req, res) => {
        let params = req.body;

        let resultObj = {};

        params.salt = baseUtil.getRandomStr(4);
        params.password = baseUtil.createMd5(params.salt+params.password)

        // params.createtime = new Date()       // 更加底层～

        wxuserDbUtil.createWxuser(params).then((doc) => {
            resultObj = {
                code: 0,
                message: '注册成功',
                userinfo: doc
            }
        }, (err) => {
            // 已存在！
            let errmsg = '';
            if (err.message.indexOf('duplicate key') > -1) {
                errmsg = '该用户已存在!'
            }
            resultObj = {
                code: 2,
                message: errmsg ? errmsg : '创建用户失败!'
            }
        }).then(() => {
            console.log('注册结果', resultObj)
            appResponse(res, JSON.stringify(resultObj))
        })
    })

    // 用户登录
    app.post('/user/login', (req, res) => {
        // 可能是 微信号，可能是 手机号等等。
        let params = req.body;

        let resultObj = {};
        // 直接 用 async / await !!

        wxuserDbUtil.getWxuserByMobile(params.username).then((doc) => {
            // 判断密码是否正确！
            let validatePassword = baseUtil.createMd5(doc.salt+params.password) == doc.password;

            if (!validatePassword) {
                resultObj = {
                    code: 2,
                    message: '密码错误!'
                }
            } else {
                req.session.userid = doc._id
                resultObj = {
                    code: 0,
                    message: '登录成功!',
                    userinfo: doc
                }
            }
        }, (err) => {
            let errmsg = '';
            // 这个应该是因为 用 mobile 查，类型是 数值的原因！
            if ('CastError' == err.name || err.message.indexOf('Cast to number failed') > -1) {
                errmsg = '用户名错误!'
            }
            resultObj = {
                code: 2,
                message: errmsg ? errmsg : '登录失败!'
            }
        }).then(() => {
            console.log('登录结果', resultObj)
            appResponse(res, JSON.stringify(resultObj))
        })
    })

    // 用户登出
    app.get('/user/logout', (req, res) => {
        req.session.userid = ''
        let resultObj = {
            code: 0,
            message: '退出登录成功'
        }
        appResponse(res, JSON.stringify(resultObj))
    })

    // 添加好友，用电话等号码搜索，精确查询！！
    // 如果 要用 get方式，需要 /ttest/:id/:name， 用 req.params 接收！
    app.post('/user/searchUser', (req, res) => {
        let params = req.body
        let resultObj = {}

        wxuserDbUtil.getWxuserByMobile(params.username).then((doc) => {
            // 找到了 对应的用户～
            resultObj = {
                code: 0,
                message: '查找成功',
                fuserinfo: doc      // 详情界面！其实东西很少，不能够全部查出来！
            }
        }, (err) => {
            let errmsg = '';
            if ('CastError' == err.name || err.message.indexOf('Cast to number failed') > -1) {
                errmsg = '该用户不存在!'
            }
            resultObj = {
                code: 2,
                message: errmsg ? errmsg : '查到用户出现错误!'
            }
        }).then(() => {
            console.log('登录结果', resultObj)
            appResponse(res, JSON.stringify(resultObj))
        })
    })


    // 获取好友通讯录
    app.get('/user/getContacts', (req, res) => {
        // 直接根据session 的值！！

    })

}
