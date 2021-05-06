'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const crypto_js_1 = __importDefault(require('crypto-js'))
const system_1 = require('@/setting/system')
exports.default = {
  //随机生成指定数量的16进制key
  generatekey(num) {
    num = num ? num : 16
    const library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let key = ''
    for (let i = 0; i < num; i++) {
      const randomPoz = Math.floor(Math.random() * library.length)
      key += library.substring(randomPoz, randomPoz + 1)
    }
    return key
  },
  //加密
  encrypt(word, keyStr) {
    if (!word) {
      return ''
    }
    keyStr = keyStr ? keyStr : system_1.keyCode || 'abcdsxyzhkj84239' //判断是否存在ksy，不存在就用定义好的key
    const keyHex = crypto_js_1.default.enc.Utf8.parse(keyStr)
    const option = { mode: crypto_js_1.default.mode.ECB, padding: crypto_js_1.default.pad.Pkcs7 }
    const encrypted = crypto_js_1.default.DES.encrypt(word, keyHex, option)
    return encrypted.ciphertext.toString()
  },
  //解密
  decrypt(word, keyStr) {
    if (!word) {
      return ''
    }
    keyStr = keyStr ? keyStr : system_1.keyCode || 'abcdsxyzhkj84239'
    const keyHex = crypto_js_1.default.enc.Utf8.parse(keyStr)
    const decrypted = crypto_js_1.default.DES.decrypt(
      {
        ciphertext: crypto_js_1.default.enc.Hex.parse(word),
      },
      keyHex,
      {
        mode: crypto_js_1.default.mode.ECB,
        padding: crypto_js_1.default.pad.Pkcs7,
      },
    )
    return decrypted.toString(crypto_js_1.default.enc.Utf8)
  },
}
