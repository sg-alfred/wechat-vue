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
        params.status = 0;      // 添加好友 标志位！
        params.createtime = new Date();
        params.addtime = new Date();

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
     * 统一好友请求，貌似没有拒绝这个选项吧？可以删除？？
     */
    app.post('/contact/acceptFriend', (req, res) => {
        let params = req.body

        let commonParams = {
            status: 1,      // 标记为好友状态！
            agreetime: new Date()
        }

        // 应该创建一个聊天室，是的，第一次有个问候！不过分！！
        chatroomDbUtil.createNewChatroom().then((doc1) => {
            // 聊天室的id
            commonParams.chatroomid = doc1._id;

        }).then(() => {
            // 更新对方 请求的状态！
            let params2 = {
                uid: params.fid,
                fid: params.uid,
            }
            let updateParams = Object.assign(params2, commonParams)

            // 这是根据 uid+fid 更新的！ 其实也可以先查 获取id ,然后 再根据id - 多了一步，没有必要！
            contactDbUtil.updateContact(updateParams).then((doc2) => {

            }).then(() => {
                // 新建自己的好友关系
                let insertParams = Object.assign(params, commonParams)
                contactDbUtil.createContact(insertParams).then((doc3) => {

                })
            })
        }).catch((err) => {

        })

    })
}
