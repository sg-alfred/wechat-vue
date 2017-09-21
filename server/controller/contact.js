/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// const contactDbUtil = require('../dbService/contact')
// const chatroomDbUtil = require('../dbService/chatroom')

const ContactModel = global.dbHandel.getModel('Contact')
const ChatroomModel = global.dbHandel.getModel('Chatroom')

const baseUtil = require('./utils/baseUtil')

module.exports = (app) => {

    /**
     * 获取好友通讯录
     * ---------------------------------------------
     */
    app.get('/contacts', async (req, res) => {
        // 直接根据session 的值！！
        console.log('根据 session 值获取 通讯录：', req.session.userid)

        let resultObj = {};
        const uid = req.session.userid;

        if (!uid) {
            resultObj = {
                code: 0,
                message: '获取列表失败',
            }
            console.log('获取结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }

        try {
            // 直接查询详情了？这个，或许可以消停一些？———— 或许可以考虑适当冗余，再说吧！！其实就是用户头像和用户名！
            // 其实微信的，都是缓存到手机了的，点击详情的时候 才会再再次查询，这时候，用户名和头像还可能变掉！——
            // 不是的，毕竟要查聊天室和用户名头像等信息。因此，点用户详情的时候，不需要再查库了！可以写在 vuex 里面～
            // 注意敏感字段的过滤！
            const contacts = await ContactModel.find({
                uid, status: 1
            }).populate('fid', '-salt -password -createtime -updatetime').exec()

            resultObj = {
                code: 0,
                message: '获取列表成功',
                data: contacts
            }
        } catch (err) {
            resultObj = {
                code: 0,
                message: '获取列表失败',
            }
        } finally {
            console.log('获取结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }

        /*contactDbUtil.getContacts(req.session.userid).then((doc) => {
            resultObj = {
                code: 0,
                message: '获取列表成功',
                data: doc
            }
        }, (err) => {
            resultObj = {
                code: 0,
                message: '获取列表失败',
            }
        }).then(() => {
            console.log('获取结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        })*/
    })

    /**
     * 请求添加好友，，这时候应该用到推送了！至少要写在那里！！
     * ---------------------------------------------
     */
    app.post('/contact/addNewFriend', async (req, res) => {
        let resultObj = {}
        let params = req.body

        // 还有 uid,fid,alias,
        params.uid = req.session.userid;
        params.status = 0;      // 添加好友 标志位！
        params.addtime = new Date();

        console.log('添加好友的信息--', params)

        try {
            const doc = await new ContactModel(params).save();
            resultObj = {
                code: 0,
                message: '申请成功，等待对方确认',
                data: doc
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('添加结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    /**
     * 统一好友请求, 必须使用 ES6 !! 不然会疯掉的！
     * 未必同意吧，如果拒绝怎么办？
     * ---------------------------------------------
     */
    app.post('/contact/acceptFriend', async (req, res) => {
        let fid = req.body.fid
        let uid = req.session.userid

        let resultObj = {}

        let commonParams = {
            status: 1,      // 标记为好友状态！
            agreetime: new Date()
        }

        try {
            // 这里如果出错了 会怎么样？
            const chatroomInfo = await new ChatroomModel().save();
            if (!chatroomInfo) {
                throw new Error('创建聊天室异常');
            }

            commonParams.chatroomid = chatroomInfo._id;

            // 更新对方好友的 好友关系
            const updateFriendInfo = await ContactModel.updateOne({
                uid: fid, fid: uid
            }, commonParams)

            if (!updateFriendInfo) {
                throw new Error('同意好友请求异常');
            }

            // 创建自身的通讯录 参数
            let selfParams = Object.assign({uid, fid}, commonParams)
            const selfInfo = await new ContactModel(selfParams).save()

            if (!selfInfo) {
                throw new Error('新建好友关系异常');
            }

            resultObj = {
                code: 0,
                message: '同意好友成功',
                data: selfInfo
            }

        } catch (err) {
            console.log(err.message, err);
            resultObj = {
                code: 2,
                message: err.message,
            }
        } finally {
            console.log('同意结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }

        /*// let chatroomParams, 不需要，因为聊天室 只有最后一次的消息id!!
        chatroomDbUtil.createNewChatroom().then((doc1) => {
            // 聊天室的id
            commonParams.chatroomid = doc1._id;
            // 同时 应该往聊天室里插入一条消息，说，你好～～

        }, (err) => {
            resultObj = {
                code: 2,
                message: '创建聊天室异常'
            }
        }).then(() => {
            // 更新对方 请求的状态！
            let updateParams = Object.assign({}, commonParams)
            updateParams.uid = fid
            updateParams.fid = uid

            console.log('更新对方好友的信息--', updateParams)

            // 这是根据 uid+fid 更新的！ 其实也可以先查 获取id ,然后 再根据id - 多了一步，没有必要！
            contactDbUtil.updateContact(updateParams).then((doc2) => {
                console.log('更新好友请求成功')
            }, (err) => {
                resultObj = {
                    code: 2,
                    message: '同意好友请求异常'
                }
            }).then(() => {

                // 新建自己的好友关系
                let insertParams = Object.assign({}, commonParams)
                insertParams.uid = uid
                insertParams.fid = fid
                insertParams.createtime = new Date();

                console.log('新建自己的好友信息--', insertParams)

                contactDbUtil.createContact(insertParams).then((doc3) => {
                    resultObj = {
                        code: 0,
                        message: '同意好友成功',
                        data: doc3
                    }
                }, (err) => {
                    resultObj = {
                        code: 2,
                        message: '新建好友关系异常'
                    }
                })
            })
        }).then(() => {
            console.log('同意结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        })*/
    })


    /**
     * 获取他人申请的添加好友列表，待同意的及已同意的
     * ---------------------------------------------
     * @since 2017-08-13
     */
    app.get('/contact/getFriends', async (req, res) => {
        // 直接根据session 的值！！
        let resultObj = {};
        let fid = req.session.userid;

        try {
            const doc = await ContactModel.find({fid}).populate('uid').exec();
            resultObj = {
                code: 0,
                message: '获取列表成功',
                data: doc
            }
        } catch (err) {
            resultObj = {
                code: 0,
                message: err.message,
            }
        } finally {
            console.log('获取结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })
}
