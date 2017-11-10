/**
 * 接口路由
 *
 * http://www.expressjs.com.cn/guide/routing.html
 * 可使用 express.Router 类创建模块化、可挂载的路由句柄
 *
 * Created by chenjz on 2017/9/18.
 */
 
'use strict'

import tools from './tools'
import wxuser from './user'
import session from './session'
import contact from './contact'
import chatroom from './chatroom'
import moment from './moment'

export default app => {
    app.use('/tools', tools)
    app.use('/users', wxuser)
    app.use('/session', session)        // 用户登录的时候，type 可以使用 刷脸登录！
    app.use('/contacts', contact)
    app.use('/chatrooms', chatroom)
    app.use('/moments', moment)
}

 /**
登录实际是对应的资源是 session，因此
    GET /session # 获取会话信息 
    POST /session # 创建新的会话（登录） 
    PUT /session # 更新会话信息 
    DELETE /session # 销毁当前会话（注销） 

而注册对应的资源是user，api如下： 
    GET /user/:id # 获取id用户的信息 
    POST /user # 创建新的用户（注册） 
    PUT /user/:id # 更新id用户的信息 
    DELETE /user/:id # 删除id用户（注销）

作者：sz chen
链接：https://www.zhihu.com/question/20346297/answer/127007546
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
