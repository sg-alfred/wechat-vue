/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const Contact = global.dbHandel.getModel('Contact')

let contactUtil = {}

/**
 * 对啊！这个可以用到两次！！
 *
 * @param params
 * @returns {Promise}
 */
contactUtil.createContact = (params) => {
    let contact = new Contact(params)
    return new Promise((resolve, reject) => {
        contact.save((err, doc) => {
            console.log('插入通讯录数据库结果', err, doc)
            if (err) {
                // 或许我这个时候 就应该翻译一下！！而不是等着 controller 来解决！
                // 比如这里的 已经重复添加了！
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

/**
 * 更新好友关系，包括 同意，还有删除？？
 * 啥？删除好友，这个之后在说
 *
 * @param params ／ condition, updateParams，等等～
 */
contactUtil.updateContact = (params) => {

    return new Promise((resolve, reject) => {

        // 还是有很多相关的 更新方法！ 比如：Model.updateOne, Model.updateMany, Model.findByIdAndUpdate,
        // Model.findOneAndUpdate([conditions], [update], [options], [callback])

        // 使用语法要 知道～ 但是，有些东西不知道啊！！ 可以设定多传一些 参数～
        Contact.update({uid: params.uid, fid: params.fid},
            {status: params.status},
            (err, doc) => {
                console.log('更新通讯录数据库结果', err, doc)
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
        })
    })
}

/**
 * 获取添加我为好友的用户列表
 *
 * @param fid
 * @returns {Promise}
 */
contactUtil.getNewFriends = (fid) => {

    // 需要联表查询，至少要知道 用户名和手机号等～
    return new Promise((resolve, reject) => {
        Contact.find({'fid': fid}).populate('uid').exec((err, doc) => {
            console.log('查询结果', err, doc)
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

/**
 * 获取通讯录, status 为1，好友状态！
 *
 * @param uid
 * @returns {Promise}
 */
contactUtil.getContacts = (uid) => {
    return new Promise((resolve, reject) => {
        Contact.find({'uid': uid, status: 1}).populate('fid').exec((err, doc) => {
            console.log('查询结果', err, doc)
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports = contactUtil
