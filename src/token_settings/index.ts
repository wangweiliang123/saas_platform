export {}
import { tokenSecret, tokenExpiresIn } from '../configs/system.config'
const jwt = require('jsonwebtoken')
const setToken = (obj: any) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }
  try {
    return jwt.sign(obj, tokenSecret, {
      expiresIn: tokenExpiresIn,
    })
  } catch {
    return false
  }
}
const getToken = (obj: string) => {
  if (!obj) {
    return ''
  }
  try {
    return jwt.verify(obj, tokenSecret)
  } catch {
    return ''
  }
}
module.exports = {
  setToken,
  getToken,
}
