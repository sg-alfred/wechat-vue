/**
 * Created by chenjz on 2017/8/6.
 */
'use strict'

const Chatroom = global.dbHandel.getModel('Chatroom')

let chatroomDbUtil = {}

/**
 * 创建新的聊天室
 *
 * @param params
 * @returns {Promise}
 */
chatroomDbUtil.createNewChatroom =  (params) => {
    let chatroom = new Chatroom(params)

    return new Promise((resolve, reject) => {
        chatroom.save((err, doc) => {
            console.log('聊天室数据库结果', err, doc)
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

/**
 * 更新最后一条聊天记录！但是，没有必要实时更新吧？？本身存聊天记录就是不好的！！
 *
 * @param params
 */
chatroomDbUtil.updateChatroom = (params) => {

}

module.exports = chatroomDbUtil
