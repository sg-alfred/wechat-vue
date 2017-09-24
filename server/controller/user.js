/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// const wxuserDbUtil = require('../dbService/user')

const baseUtil = require('./utils/baseUtil')
const UserModel = global.dbHandel.getModel('User');
const ContactModel = global.dbHandel.getModel('Contact')

const baseinfo = ''     // 基本信息，不包含敏感信息

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

            // 这样 也是一种写法吧～，但是像密码错误，不好弄啊，try的话，抛一下就好了～
            /*dbUserinfo.then((userinfo) => {

            }).catch(() => {

            }).then(() => {

            })*/

            if (!dbUserinfo) {
                throw new Error('用户名错误!');
            } else {
                const frontpwd = baseUtil.createMd5(dbUserinfo.salt + baseUtil.createMd5(params.password))

                if (frontpwd !== dbUserinfo.password ) {
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
     * 规定：微信id 不能是 11位的手机号码！！
     *
     * 1、判断是否位好友关系！
     * 2、如果不是再查其他的～
     *
     * 不对，是先查用户获取id，之后再查关系！如果有关系，返回关系，没有则为一般信息
     * 等等，那还不如，先前端查一下 vuex，如果有直接取，没有的话就是 非好友关系，再查后端
     */
    app.get('/users/:keyword', async (req, res) => {
        let resultObj = {}
        let userinfo;

        const keyword = req.params.keyword

        try {
            if (typeof keyword === 'undefined') {
                throw new Error('查询条件不能为空！');
            }

            // 如果是 11位，按照手机号码尝试，不行这用微信号查找
            if (/^\d{11}$/.test(keyword)) {
                userinfo = await UserModel.findOne({mobilephone: keyword, deleted: false})
            } else {
                // 用微信号查询。
                userinfo = await UserModel.findOne({wechatno: keyword, deleted: false})
            }

            if (!userinfo) {
                throw new Error('没有查到此用户！');
            }

            // const contact = await ContactModel.find({
            //     uid, fid: userinfo._id, status: 1
            // }).populate('fid', '-salt -password -createtime -updatetime').exec()

            resultObj = {
                code: 0,
                message: '查询成功',
                data: userinfo
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('查询结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    /**
     * 增量 更新用户信息
     */
    app.patch('/users/:id', async (req, res) => {
        let resultObj = {}

        const _id = req.session.userid
        const updateParams = req.body

        console.log('入参：', _id, updateParams)

        try {
            const oldUserinfo = UserModel.findById({_id}, 'mobilephone')
            console.log('旧信息：', {_id}, oldUserinfo);

            const newUserinfo = UserModel.findByIdAndUpdate({_id}, {$set: {updateParams}}, {new: true})
            resultObj = {
                code: 0,
                message: '更新成功',
                data: newUserinfo
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('更新结果：', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

}
