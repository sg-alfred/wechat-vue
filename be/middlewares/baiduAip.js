/**
 * Created by chenjz on 2017/10/30.
 */
'use strict';

import { face as AipFaceClient } from 'baidu-aip-sdk';
import config from '../config';

// const AipFaceClient = sdk.face
// const AipFaceClient = require("baidu-aip-sdk").face;

const { APP_ID, API_KEY, SECRET_KEY } = config.baidu;

export default new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
