'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const js_base64_1 = require('js-base64')
exports.default = {
  //加密
  encrypt(message) {
    if (!message) {
      return ''
    }
    return js_base64_1.Base64.encode(message)
  },
  //解密
  decrypt(message) {
    if (!message) {
      return ''
    }
    return js_base64_1.Base64.decode(message)
  },
}
