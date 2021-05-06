'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const js_md5_1 = __importDefault(require('js-md5'))
exports.default = {
  //加密
  encrypt(message) {
    if (!message) {
      return ''
    }
    return js_md5_1.default(message)
  },
}
