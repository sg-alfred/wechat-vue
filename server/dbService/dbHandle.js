/**
 * Created by chenjz on 2017/7/30.
 */
'use strict'

// import mongoose from 'mongoose'

const fs = require("fs")
const path = require("path")

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost/wxtest'

// 简介数据库
mongoose.connect(DB_URL, {
    useMongoClient: true,
});

// 数据库连接等
const db = mongoose.connection;

db.once('open' ,() => {
    console.log('连接数据成功')

}).on('error', function(error) {
    console.error('连接数据库错误: ' + error);
    mongoose.disconnect();

}).on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(DB_URL, {
        server: {auto_reconnect: true}
    });
});

// export default db;

// 遍历文件夹下的文件，并暴露出 models
let root = path.join(__dirname, '../schemas')

// let root = '/server/schemas';

let schemas = readDirSync(root)

for(let m in schemas) {
    if (schemas.hasOwnProperty(m)) {
        mongoose.model(m, schemas[m]);
    }
}

module.exports = {
    db,
    getModel: (type) => {
        console.log(type)
        return mongoose.model(type);
    }
}

function readDirSync(path) {

    let schemas = [];
    let pa = fs.readdirSync(path);

    let i = 0;
    pa.forEach((ele, index) => {
        if (!(ele.indexOf('index') > -1)) {
            let basename = ele[0].toUpperCase() + ele.substr(1, ele.length-4);
            // 需要 require 进来啊！！
            // console.log(path + '/' + ele)

            schemas[basename] = require(path + '/' + ele)
        }
    })
    return schemas;
}
