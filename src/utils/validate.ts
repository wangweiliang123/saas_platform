// 验证 工具类

/**
 * 检测  非空
 * @param {string} str
 * @returns {Boolean}
 */
export const checkNotNull = (str: string) => {
  if (str == '' || null || !str) {
    return false
  }
  return true
}

/**
 * 检测  手机号
 * @param {string} phone
 * @returns {Boolean}
 */
export const checkPhone = (phone: any) => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

/**
 * 检测  身份证号
 * @param {string} IDcard
 * @returns {Boolean}
 */
export const checkIDcard = (IDcard: any) => {
  const reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  return reg.test(IDcard)
}

/**
 * 检测  邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export const checkEmail = (email: any) => {
  const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
  return reg.test(email)
}

/**
 * 检测  正整数
 * @param {string} integer
 * @returns {Boolean}
 */
export const checkInteger = (integer: any) => {
  const reg = /^[1-9][0-9]*$/
  return reg.test(integer)
}

/**
 * 检测  正则
 * @param {string} regular正则表达式
 * @param {string} value要校验的值
 * @returns {Boolean}
 */
export const regularCheck = (regular: any, value: any) => {
  if (!regular || !value) {
    return false
  }
  const reg = regular
  return reg.test(value)
}

/**
 * 检测  6位验证码
 * @param {string}  code短信验证码
 * @returns {Boolean}
 */
export const checkCode = (code: any) => {
  const reg = /^\d{6}$/
  return reg.test(code)
}
