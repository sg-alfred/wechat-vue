/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

const wxuser = require('./controller/wxuser')
const contact = require('./controller/contact')
const chatroom = require('./controller/chatroom')

module.exports = (app) => {
    wxuser(app)
    contact(app)
    // chatroom(app)
}
