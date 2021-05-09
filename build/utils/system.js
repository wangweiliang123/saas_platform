'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNetworkLocation = exports.isWeChat = exports.getEquipmentType = exports.getEquipmentModel = exports.getNetworkIp = void 0
/**
 * 获取网络ip
 */
const getNetworkIp = () => {
  return returnCitySN || false
}
exports.getNetworkIp = getNetworkIp
/**
 * 获取设备硬件信息
 */
const getEquipmentModel = () => {
  return navigator.userAgent || false
}
exports.getEquipmentModel = getEquipmentModel
/**
 * 获取设备类型
 * 返回值1，安卓，2，ios,0，失败
 */
const getEquipmentType = () => {
  let u = navigator.userAgent
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  if (isiOS) {
    return 2
  } else if (isAndroid) {
    return 1
  }
  return 0
}
exports.getEquipmentType = getEquipmentType
/**
 * 判断是否是微信环境
 * 返回值true,false
 */
const isWeChat = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
exports.isWeChat = isWeChat
/**
 * 获取网络定位
 */
const getNetworkLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        }
      },
      () => {
        return false
      },
      {
        enableHighAcuracy: true,
        timeout: 5000,
        maximumAge: 2000, // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
      },
    )
  } else {
    return false
  }
}
exports.getNetworkLocation = getNetworkLocation
