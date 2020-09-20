/**
 * 权限校验！
 *
 * Created by chenjz on 2018/2/9.
 */
'use strict';

import { appResponse } from '../controller/utils/baseUtil';

// 那些需要权限的模块需要继承这个，比如 contacts / chatrooms / moments ..

export default class Authorize {
  constructor() {}

  async checkLogin(req, res) {
    console.log('index登录否？: ', req.session.userid);
    let resultObj = {
      code: 0,
      message: !!req.session.userid,
    };
    appResponse(res, JSON.stringify(resultObj));
  }
}
