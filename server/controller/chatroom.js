/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'
const baseUtil = require('./utils/baseUtil')
const ChatroomModel = global.dbHandel.getModel('Chatroom')

module.exports = (app) => {

    /**
     * 获取未被清除历史消息的聊天室列表
     *
     * 用 userid 关联查好友，再查聊天室信息
     */
    app.get('/chatrooms', async (req, res) => {

    })

    /**
     * 根据好友获取聊天室的设置
     */
    app.get('/chatrooms/:id', async (req, res) => {
        let resultObj = {}

        const _id = req.params.id;

        // 关联信息表～
        try {
            const allMessages = await ChatroomModel.find({_id})
            resultObj = {
                code: 2,
                message: '查询历史记录成功！',
                data: allMessages
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('获取结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    /**
     * 发送信息
     */
    app.post('/chatroom/sendMessage', async (req, res) => {
        console.log(req.body);

        // 触发 socket,
        // 保存到数据库，聊天记录，最后一条短信！
        // 但是，看到最后一条 都是 用 vuex 来维护的，确实！！没有必要记录到数据库，然后每次都做更新！！

        // socket.emit();
    })
}
