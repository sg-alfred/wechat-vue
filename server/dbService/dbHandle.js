/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

// import mongoose from 'mongoose'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost/wxtest'

// 简介数据库
mongoose.connect(DB_URL, {
    useMongoClient: true,
});

const db = mongoose.connection;

db.once('open' ,() => {
    console.log('连接数据成功')
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(DB_URL, {server:{auto_reconnect:true}});
});

// export default db;

module.exports = db
