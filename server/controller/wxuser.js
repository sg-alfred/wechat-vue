/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const wxuserDbUtil = require('../dbService/wxuser')
const appResponse = require('./resHandle')

module.exports = (app) => {

    // 判断用户是否登录
    app.get('/user/isLogin', (req, res) => {
        console.log('index登录否？: ', req.session.username);
        let resultText = req.session.username ? '已登录' : '未登录';
        res.send(resultText)
        res.end()
    })

    // 用户注册
    app.post('/user/register', (req, res) => {
        let params = req.body;

        console.log('注册信息', params)

        let resultObj;

        wxuserDbUtil.createWxuser(params).then((doc)=> {
            resultObj = {
                code: 0,
                userinfo: doc
            }
        }, (err) => {
            resultObj = {
                code: 2,
                message: '创建用户失败'
            }
        }).then(() => {
            appResponse(res, JSON.stringify(resultObj))
        })
    })

    // 用户登录
    app.post('/user/login', (req, res) => {
        // 可能是 微信号，可能是 手机号等等。
        let params = req.body;

        let resultObj;

        // 直接 用 async / await !!

        wxuserDbUtil.getWxuserByMobile(req.body.username).then((doc) => {
            console.log(doc)
            resultObj = {
                code: 0,
                userinfo: doc
            }
        }, (err) => {
            console.log(err)

            resultObj = {
                code: 2,
                message: '登录失败'
            }
        }).then(() => {

            console.log(resultObj)
            // 统一返回
            appResponse(res, JSON.stringify(resultObj))
        })
    })

    // 用户登出
    app.get('/user/logout', (req, res) => {
        req.session.username = ''
        let resultObj = {
            code: 0,
            data: '退出登录成功'
        }
        appResponse(res, JSON.stringify(resultObj))
    })

    // 获取好友通讯录
    app.get('/user/getContacts', (req, res) => {
        // 直接根据session 的值！！

    })

}
