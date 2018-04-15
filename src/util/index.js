/**
 * Created by chenjz on 2017/8/3.
 */
'use strict'

// import 后直接 export，可以 混写
// export kind from './kind-of'
// export localStorage from './localstorage'

import kindOf from './kind-of'
import localStorage from './localstorage'
import initSocketio from './socket'

// 判断对象是否为空
const isEmptyObject = (value) => {
  if (kindOf(value) !== 'object') return false
  for (let t in value) return false
  return true
}

// 将图片转化为64位编码
const convertImgToBase64 = (url, callback, outputFormat = 'image/png') => {
  let canvas = document.createElement('CANVAS'),
    ctx = canvas.getContext('2d'),
    img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)
    let dataURL = canvas.toDataURL(outputFormat)
    callback.call(this, dataURL)
    canvas = null
  }
  img.src = url
}

// this ！！function ? 箭头函数 ? 写在 main 函数里！
export const gotoAddress = (path) => {
  console.log('调转到：', path)
  if (path === -1) {
    this.$router.go(-1)
  } else {
    this.$router.push(path)
  }
}

export {
  kindOf,
  isEmptyObject,
  localStorage,
  initSocketio,
  convertImgToBase64
}
