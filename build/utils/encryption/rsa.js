'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const jsencrypt_1 = __importDefault(require('jsencrypt/bin/jsencrypt'))
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
    const key = keyStr || system_1.publicKey || this.generatekey()
    const encryptor = new jsencrypt_1.default()
    encryptor.setPublicKey(key) // 设置公钥
    return encryptor.encrypt(word)
  },
  //解密
  decrypt(word, keyStr) {
    if (!word) {
      return ''
    }
    const decrypt = new jsencrypt_1.default() // 新建JSEncrypt对象
    const key = keyStr || system_1.privateKey || this.generatekey()
    decrypt.setPrivateKey(key)
    return decrypt.decrypt(word)
  },
}
