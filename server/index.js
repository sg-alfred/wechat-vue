/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const wxuser = require('./controller/user')
const contact = require('./controller/contact')
const chatroom = require('./controller/chatroom')

module.exports = (app) => {
    wxuser(app)
    contact(app)
    chatroom(app)
}
