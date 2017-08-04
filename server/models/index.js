/**
 * Created by chenjz on 2017/8/4.
 */
'use strict'

// 遍历文件夹下的文件，并引入！！

module.exports = {
    getModel: (type) => {
        return mongoose.model(type);
    }
};
