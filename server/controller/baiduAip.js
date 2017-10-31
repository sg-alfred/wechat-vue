/**
 * Created by chenjz on 2017/10/30.
 */
'use strict'

import { face as AipFaceClient } from 'baidu-aip-sdk'

// const AipFaceClient = sdk.face
// const AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
const APP_ID = "10240556";
const API_KEY = "DxN5cW1ZYbMizmFV0SEuQR2Z";
const SECRET_KEY = "uhVfvNMqYPYuMclks7pMrmfM2DVD62Z3";

export default new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
