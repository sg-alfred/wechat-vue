/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'
const baseUtil = require('./utils/baseUtil')
const ContactModel = global.dbHandel.getModel('Contact')
const ChatroomModel = global.dbHandel.getModel('Chatroom')
const MessageModel = global.dbHandel.getModel('Message')

module.exports = (app) => {

    /**
     * 获取未被清除历史消息的聊天室列表
     *
     * 用 userid 关联查好友，再查聊天室信息
     */
    app.get('/chatrooms', async (req, res) => {
        let resultObj = {}

        const uid = req.session.userid

        try {
            const chatrooms = await ContactModel.find({uid}, 'chatid fid uid nickname cleartime')
                .populate('fid', 'headimgurl mobilephone alias')
                .populate('chatid')
                .exec()

            // 这个也需要循环遍历，还不如冗余出来！！
            // const lastMessage = MessageModel.find({_id: chatrooms.chatid.lastmsgid})

            console.log('聊天室的信息～', chatrooms)

            // 这样也就够了！
            resultObj = {
                code: 2,
                message: '获取聊天室成功',
                data: chatrooms
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('获取聊天室结果-', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    })

    /**
     * 根据好友获取聊天室的设置
     */
    app.get('/chatrooms/:id', async (req, res) => {
        let resultObj = {}

        const chatid = req.params.id;

        try {
            // 按照发送时间升序！！
            const allMessages = await MessageModel.find({chatid}).sort({sendtime: 1})

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
     * 其实，应该是可以放在 vuex 里的，销毁界面之前 (beforeDestroy) 执行一下插入就够了！！
     * 这样，每次插入还要更改 lastmsgid 太累了！！
     */
    app.post('/chatrooms/:chatid', async (req, res) => {
        let resultObj = {}

        const chatid = req.params.chatid

        let messageParams = req.body
        messageParams.fromid = req.session.userid
        messageParams.chatid = chatid

        console.log('发送到消息详情', chatid, messageParams);

        try {
            const messageInfo = await new MessageModel(messageParams).save()

            // 保存后修改 chatid 的最后一条记录指向？会不会太累了？
            await ChatroomModel.findOneAndUpdate({'_id': chatid}, {$set: messageParams})

            resultObj = {
                code: 0,
                message: '发送成功！',
                data: messageInfo
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: '发送失败！',
            }
        } finally {
            console.log('信息发送结果', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }

        // 触发 socket,
        // 保存到数据库，聊天记录，最后一条短信！
        // 但是，看到最后一条 都是 用 vuex 来维护的，确实！！没有必要记录到数据库，然后每次都做更新！！

        // socket.emit();
    })
}
