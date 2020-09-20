/**
 * 日志类 封装
 * Created by chenjz on 2017/10/27.
 */
'use strict';

import log4js from 'log4js';
import path from 'path';

log4js.configure({
  appenders: [
    {
      type: 'console',
      category: 'dev',
    },
    {
      type: 'file',
      filename: path.join(),
    },
  ],
});

log4js.getLogger('dev');

log4js.BaseLayout();

// 不同环境下，需要输出不同的结果，但是，我又总不能写很多次？
// 什么？ 日志级别提高一点不就可以了吗？
