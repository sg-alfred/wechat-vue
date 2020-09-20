/**
 * 基本工具类，包括 生成随机字符；md5加密 等
 * Created by chenjz on 2017/8/6.
 */
'use strict';

import crypto from 'crypto';

/**
 *
 * @param response
 * @param resultObj
 */
let appResponse = (response, resultObj) => {
  response.writeHead(200, {
    'Content-type': 'application/json',
  });

  // 应该可以打印出请求，然后再打印结果。。

  response.end(resultObj);
};

/**
 * 检查手机号是否合格
 * ---------------------------------------------
 * @param mobile
 */
let mobileValidate = (mobile) => mobile.test(/^\d{11}$/);

/**
 * 获取随机长度的字符串
 * ---------------------------------------------
 * @param length
 * @returns {string}
 */
let getRandomStr = (length = 4) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';

  for (let i = 0; i < length; i++) {
    res += chars.substr(Math.random() * (chars.length - 1), 1);
  }

  return res;
};

/**
 * md5加密字符串
 * ---------------------------------------------
 * @param str
 * @returns {string}
 */
let createMd5 = (str) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

export default {
  appResponse,
  mobileValidate,
  getRandomStr,
  createMd5,
};
