/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

module.exports = (app) => {

    /**
     * 根据好友获取聊天室的设置
     */
    app.get('/chatroom/getChatById', (req, res) => {

    })

    /**
     * 发送信息
     */
    app.post('/chatroom/sendMessage', (req, res) => {
        console.log(req.body);

        // 触发 socket,
        // 保存到数据库，聊天记录，最后一条短信！
        // 但是，看到最后一条 都是 用 vuex 来维护的，确实！！没有必要记录到数据库，然后每次都做更新！！

        // socket.emit();
    })
}
