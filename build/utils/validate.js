'use strict'
// 验证 工具类
Object.defineProperty(exports, '__esModule', { value: true })
exports.checkCode = exports.checkEmail = exports.checkIDcard = exports.checkPhone = exports.checkNotNull = void 0
/**
 * 检测  非空
 * @param {string} str
 * @returns {Boolean}
 */
const checkNotNull = (str) => {
  if (str == '' || null || !str) {
    return false
  }
  return true
}
exports.checkNotNull = checkNotNull
/**
 * 检测  手机号
 * @param {string} phone
 * @returns {Boolean}
 */
const checkPhone = (phone) => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}
exports.checkPhone = checkPhone
/**
 * 检测  身份证号
 * @param {string} IDcard
 * @returns {Boolean}
 */
const checkIDcard = (IDcard) => {
  const reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  return reg.test(IDcard)
}
exports.checkIDcard = checkIDcard
/**
 * 检测  邮箱
 * @param {string} email
 * @returns {Boolean}
 */
const checkEmail = (email) => {
  const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
  return reg.test(email)
}
exports.checkEmail = checkEmail
/**
 * 检测  6位验证码
 * @param {string}  code短信验证码
 * @returns {Boolean}
 */
const checkCode = (code) => {
  const reg = /^\d{6}$/
  return reg.test(code)
}
exports.checkCode = checkCode
