'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var system_config_1 = require('../configs/system.config')
var jwt = require('jsonwebtoken')
var setToken = function (obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }
  try {
    return jwt.sign(obj, system_config_1.tokenSecret, {
      expiresIn: system_config_1.tokenExpiresIn,
    })
  } catch (_a) {
    return false
  }
}
var getToken = function (obj) {
  if (!obj) {
    return false
  }
  try {
    return jwt.verify(obj, system_config_1.tokenSecret)
  } catch (_a) {
    return false
  }
}
module.exports = {
  setToken: setToken,
  getToken: getToken,
}
