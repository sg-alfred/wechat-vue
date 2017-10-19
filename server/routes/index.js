/**
 * 接口路由
 *
 * http://www.expressjs.com.cn/guide/routing.html
 * 可使用 express.Router 类创建模块化、可挂载的路由句柄
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict'

import wxuser from './user'
import session from './session'
import contact from './contact'
import chatroom from './chatroom'

export default app => {
    app.use('/users', wxuser)
    app.use('/session', session)
    app.use('/contacts', contact)
    app.use('/chatrooms', chatroom)
}
