'use strict'
/**
 * 获取当前域名
 */
const VUE_APP_MODE = process.env.VUE_APP_MODE
let domain
if (VUE_APP_MODE == 'development') {
  // 本地
  domain = 'cloud.test.qyaqdx.com'
} else {
  // pre 预生产
  // prod 生产
  switch (VUE_APP_MODE) {
    case 'test': // 测试
      domain = 'cloud.test.qyaqdx.com'
      break
    case 'pre': // 测试
      domain = 'cloud.test.qyaqdx.com'
      break
    case 'prod': // 生产
      domain = 'cloud.qianuni.com'
      break
    default:
      // 测试
      domain = 'cloud.test.qyaqdx.com'
      break
  }
}
module.exports = {
  domain,
}
