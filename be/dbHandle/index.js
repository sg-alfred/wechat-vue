/**
 * Created by chenjz on 2017/7/30.
 */
'use strict';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost/wxtest';

// 连接数据库
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

// 数据库连接等
const db = mongoose.connection;

db.once('open', () => {
  console.log('连接数据成功');
})
  .on('error', function (error) {
    console.error('连接数据库错误: ' + error);
    mongoose.disconnect();
  })
  .on('close', function () {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(DB_URL, {
      server: { auto_reconnect: true },
    });
  });

export default db;
