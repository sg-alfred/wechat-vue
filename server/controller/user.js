/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// const wxuserDbUtil = require('../dbService/user')

const baseUtil = require('./utils/baseUtil')
const UserModel = global.dbHandel.getModel('User');

module.exports = (app) => {

    // 判断用户是否登录
    app.get('/user/checkLogin', (req, res) => {
        console.log('index登录否？: ', req.session.userid);
        let resultObj = {
            code: 0,
            message: !!req.session.userid
        }
        baseUtil.appResponse(res, JSON.stringify(resultObj))
    })

    // 用户登出
    app.get('/user/logout', (req, res) => {
        delete req.session.userid
        let resultObj = {
            code: 0,
            message: '退出登录成功'
        }
        baseUtil.appResponse(res, JSON.stringify(resultObj))
    })

    // 用户注册，如何判断验证码？
    app.post('/user/register', async (req, res) => {
        let resultObj = {};

        let params = req.body;

        // 加盐的这一步，移到  presave 里面！！ 更加合理！
        params.salt = baseUtil.getRandomStr(4);
        params.password = baseUtil.createMd5(params.salt + baseUtil.createMd5(params.password))

        try {
            const doc = await new UserModel(params).save();
            resultObj = {
                code: 0,
                message: '注册成功',
                data: doc
            }
        } catch (err) {
            // 已存在！，这样判断 虽然只要 插入一次，而不用 findOne 一下，但感觉，这样判断好奇怪！
            let errmsg = '';
            if (err.message.indexOf('duplicate key') > -1) {
                errmsg = '该用户已存在!'
            }
            resultObj = {
                code: 2,
                message: errmsg ? errmsg : '创建用户失败!'
            }
        } finally {
            console.log('注册结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    /**
     * 用户登录
     */
    app.post('/user/login', async (req, res) => {
        let resultObj = {};

        // 可能是 微信号，可能是 手机号等等。
        let params = req.body;

        try {
            // 如果用手机号的，需要校验属否为数字，否则，这样查找会异常！—— CastError
            const dbUserinfo = await UserModel.findOne({
                mobilephone: params.username, deleted: false
            })

            if (!dbUserinfo) {
                throw new Error('用户名错误!');
            } else {
                let validatePassword = baseUtil.createMd5(dbUserinfo.salt + params.password) === dbUserinfo.password;

                if (!validatePassword) {
                    throw new Error('密码错误!');
                } else {
                    req.session.userid = dbUserinfo._id
                    resultObj = {
                        code: 0,
                        message: '登录成功!',
                        userinfo: dbUserinfo
                    }
                }
            }
        } catch (err) {
            console.log('登录出错', err.message)
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('登录结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }


        /*wxuserDbUtil.getWxuserByMobile(params.username).then((doc) => {
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
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        })*/
    })

    /**
     * Restful API 的风格！
     * 添加好友，用手机号码、微信号，精确查询！！只有这两个，还必须是精确的！
     *
     * 需要判断 可能是哪一个！！
     */
    app.get('/users/:keyword', async (req, res) => {
        let resultObj = {}
        let userinfo;

        const keyword = req.param.keyword
        const deleted = false

        try {
            // 如果是 11位，按照手机号码尝试，不行这用微信号查找
            if (/^\d{11}$/.test(keyword)) {
                userinfo = await UserModel.findOne({mobilephone: keyword, deleted})
            }
            // 查到退出，否则用微信号查询
            if (!userinfo) {
                userinfo = await UserModel.findOne({wechatno: keyword, deleted})
            }
            // if () {
            //
            // }
            resultObj = {
                code: 0,
                message: userinfo ? '查询成功' : '没有此用户',
                data: userinfo
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('登录结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    // 获取好友通讯录
    app.get('/user/contacts', (req, res) => {
        // 直接根据session 的值！！

    })

}
