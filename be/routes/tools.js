/**
 * Created by chenjz on 2017/10/20.
 */
'use strict';

import express from 'express';
import { writeFile } from 'fs';
import qr from 'qr-image';
import baseUtil from '../controller/utils/baseUtil';

const router = express.Router();

/**
 * 生成二维码
 */
router.get('/qrcode', (req, res) => {
  let resultObj = {};

  const { handle, uid } = req.query;

  const handleArr = ['addFriend', 'pay'];

  try {
    if (
      typeof handle === 'undefined' ||
      typeof uid === 'undefined' ||
      uid !== req.session.userid ||
      !handleArr.includes(handle)
    ) {
      throw new Error('生成二维码参数错误');
    }

    const text = `handle=${handle}&uid=${uid}`;

    // 保存下来，然后再转化成 base64 ？?

    // let img = qr.image(text, {size: 10})
    // res.writeHead(200, {'Content-Type': 'image/png'})
    // img.pipe(res)

    // res.writeHead(200, {'Content-Type': 'application/json'})

    // 如何指定宽高？
    const svg = qr.imageSync(text, { type: 'svg', size: 10 });

    resultObj = {
      code: 0,
      message: '生成二维码成功',
      data: { svg },
    };
  } catch (err) {
    resultObj = {
      code: 2,
      message: err.message,
    };
  } finally {
    console.log('结果', resultObj);
    baseUtil.appResponse(res, JSON.stringify(resultObj));
  }
});

/**
 * 图片上传
 */
router.post('/upload', async (req, res) => {
  let resultObj = {};

  // 接收前台POST过来的base64
  const imgData = req.body.imgData;

  // 过滤data:URL !! 之后保存！
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64Data, 'base64');

  try {
    await writeFile('image.png', dataBuffer);
    resultObj = {
      code: 0,
      message: '保存成功！',
    };
  } catch (err) {
    resultObj = {
      code: 2,
      message: `保存失败，${err.message}`,
    };
  } finally {
    baseUtil.appResponse(res, resultObj);
  }

  // fs.writeFile('image.png', dataBuffer, function (err) {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send('保存成功！')
  //   }
  // })
});

export default router;
