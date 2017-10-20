/**
 * Created by chenjz on 2017/10/20.
 */
'use strict'

import qr from 'qr-image'
import express from 'express'
const router = express.Router()

import baseUtil from '../controller/utils/baseUtil'

/**
 * 生成二维码
 */
router.get('/create_qrcode', (req, res) => {
    let resultObj = {}

    const text = req.query.text;

    try {
        // 保存下来，然后再转化成 base64 ？?

        // let img = qr.image(text, {size: 10})
        // res.writeHead(200, {'Content-Type': 'image/png'})
        // img.pipe(res)

        // res.writeHead(200, {'Content-Type': 'application/json'})

        // 如何指定宽高？
        const svg = qr.imageSync(text, { type: 'svg', size: 10 });

        console.log('svg 图片～', svg)

        resultObj = {
            code: 0,
            message: '生成二维码成功',
            data: { svg }
        }
    } catch (err) {
        resultObj = {
            code: 2,
            message: '生成二维码失败！',
        }
    } finally {
        console.log('结果', resultObj)
        baseUtil.appResponse(res, JSON.stringify(resultObj))
    }
})


router.post('/upload', function(req, res){
    //接收前台POST过来的base64
    const imgData = req.body.imgData;
    //过滤data:URL !! 之后保存！
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
        if(err) {
            res.send(err);
        } else {
            res.send("保存成功！");
        }
    });
});


export default router
