/**
 * 微信用户类
 *
 * Created by chenjz on 2017/10/18.
 */
'use strict'

import UserModel from '../models/user'

import multer from 'multer'
import path from 'path'
import baseUtil from './utils/baseUtil'

class User {

    constructor() {

        // 基本信息，不包含敏感信息
        this.baseinfo = 'headimgurl mobilephone alias gender age'
    }

    async checkLogin (req, res) {
        console.log('index登录否？: ', req.session.userid);
        let resultObj = {
            code: 0,
            message: !!req.session.userid
        }
        baseUtil.appResponse(res, JSON.stringify(resultObj))
    }

    async login (req, res) {
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
                const frontpwd = baseUtil.createMd5(dbUserinfo.salt + baseUtil.createMd5(params.password))

                if (frontpwd !== dbUserinfo.password ) {
                    throw new Error('密码错误!');
                } else {
                    req.session.userid = dbUserinfo._id
                    req.session.userinfo = dbUserinfo           // 缓存用户信息

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
    }

    async logout (req, res) {
        delete req.session.userid
        let resultObj = {
            code: 0,
            message: '退出登录成功'
        }
        baseUtil.appResponse(res, JSON.stringify(resultObj))
    }

    async register (req, res) {
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
    }

    async searchUser (req, res) {
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
    }

    async updateUser (req, res) {
        let resultObj = {}

        const uid = req.session.userid

        const updateID = req.params.id      // 更新的用户id，自己或别人的。。
        const updateParams = req.body

        console.log('入参：', uid, updateID, updateParams)

        try {
            // const oldUserinfo = UserModel.findById({_id}, 'mobilephone')
            // console.log('旧信息：', {_id}, oldUserinfo);

            const newUserinfo = await UserModel.findByIdAndUpdate({_id: uid}, {$set: updateParams}, {new: true})
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
    }

    async uploadImg (req, res) {
        let resultObj = {}

        let filename = '';

        // 图片保存路径
        const imgPath = path.join(__dirname, '../../static/image/headimg')

        const Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, imgPath);         // 这个路径，还是可以更好一些！
            },
            filename: function (req, file, callback) {
                filename = file.fieldname + "_" + Date.now() + "_" + file.originalname
                callback(null, filename);
            }
        });

        const upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

        console.log('到底又没有上传图片啊？', imgPath, filename)

        try {
            upload(req, res, (err) => {
                if (err) {
                    // throw new Error(err.message)
                } else {
                    resultObj = {
                        code: 0,
                        message: '上传成功！',
                        data: {
                            filename
                        }
                    }
                }
            })

            // 不对，这样之后 还要修改到相应的数据
            //  const newUserinfo = await UserModel.findByIdAndUpdate({_id: uid}, {$set: updateParams}, {new: true})

        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('上传图片结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    }

}

export default new User()
