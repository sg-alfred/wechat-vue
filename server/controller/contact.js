/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const contactDbUtil = require('../dbService/contact')
const chatroomDbUtil = require('../dbService/chatroom')

const appResponse = require('./resHandle')

module.exports = (app) => {

    /**
     * 请求添加好友，，这时候应该用到推送了！至少要写在那里！！
     */
    app.post('/contact/addNewFriend', (req, res) => {
        let params = req.body
        let resultObj = {}

        // 还有 uid,fid,alias,
        params.uid = req.session.userid;
        params.status = 0;      // 添加好友 标志位！
        params.createtime = new Date();
        params.addtime = new Date();

        console.log('添加好友的信息--', params)

        contactDbUtil.createContact(params).then((doc) => {
            resultObj = {
                code: 0,
                message: '申请成功，等待对方确认',
                data: doc
            }
        }, (err) => {
            resultObj = {
                code: 2,
                message: '添加好友异常!'
            }
        }).then(() => {
            console.log('添加结果', resultObj)
            appResponse(res, JSON.stringify(resultObj))
        })
    })

    /**
     * 统一好友请求
     */
    app.post('/contact/acceptFriend', (req, res) => {
        let fid = req.body.fid
        let uid = req.session.userid

        let resultObj = {}

        let commonParams = {
            status: 1,      // 标记为好友状态！
            agreetime: new Date()
        }

        // let chatroomParams, 不需要，因为聊天室 只有最后一次的消息id!!
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
            appResponse(res, JSON.stringify(resultObj))
        })
    })


    /**
     * 获取他人申请的添加好友列表，待同意的及已同意的
     *
     * @since 2017-08-13
     */
    app.get('/contact/getFriends', (req, res) => {
        // 直接根据session 的值！！
        let resultObj = {};
        contactDbUtil.getNewFriends(req.session.userid).then((doc) => {
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
            appResponse(res, JSON.stringify(resultObj))
        })
    })
}
