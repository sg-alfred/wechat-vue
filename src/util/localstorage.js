/**
 * Created by chenjz on 2017/9/20.
 */
'use strict'

const localStorage = (item, value = undefined) => {
  if (!item) return

  if (item === 'clear-all') { // 清空所有
    window.localStorage.clear()
  } else if (undefined === value) { // 获取某项
    return window.localStorage.getItem(item)
  } else if (value === null) { // 删除某项
    window.localStorage.removeItem(item)
  } else { // 存储
    // 这个不应该由我来干！！应该检测 必须为 String
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(item, value)
  }
}

export default localStorage
