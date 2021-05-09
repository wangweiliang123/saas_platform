/**
 * 秒数转为时分秒
 * @param value，秒数
 */
export const formatSeconds = (value: number) => {
  let secondTime = parseInt(String(value)) // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 小时
  if (secondTime > 60) {
    minuteTime = parseInt(String(secondTime / 60))
    secondTime = parseInt(String(secondTime % 60))
    if (minuteTime > 60) {
      hourTime = parseInt(String(minuteTime / 60))
      minuteTime = parseInt(String(minuteTime % 60))
    }
  }
  let result =
    '' + (parseInt(String(secondTime)) < 10 ? '0' + parseInt(String(secondTime)) : parseInt(String(secondTime)))
  result =
    '' +
    (parseInt(String(minuteTime)) < 10 ? '0' + parseInt(String(minuteTime)) : parseInt(String(minuteTime))) +
    ':' +
    result
  result =
    '' +
    (parseInt(String(hourTime)) < 10 ? '0' + parseInt(String(hourTime)) : parseInt(String(hourTime))) +
    ':' +
    result
  return result
}

/**
 * 对比当前时间戳与所给定时间关系
 * @param {string} timeInfo 例：2020-10-20 09:14:20
 * @returns {number} 0 为界限
 */
export const contrastTime = (timeInfo: string) => {
  if (!timeInfo) {
    return false
  }
  const timeInfoGet = String(timeInfo).replace(/-/g, '/')
  return new Date().getTime() - new Date(timeInfoGet).getTime()
}

/**
 * 时间戳格式化
 * @param {number} timeInfo,13位时间戳 返回示例：2020-10-20 09:14:20
 */
export const formatTime = (timeInfo: number) => {
  let result = ''
  if (!timeInfo) {
    return result
  }
  const timeInfoGet = String(timeInfo).replace(/-/g, '/')
  const date = new Date(Number(timeInfoGet))
  const year = date.getFullYear(),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    sdate = ('0' + date.getDate()).slice(-2),
    hour = ('0' + date.getHours()).slice(-2),
    minute = ('0' + date.getMinutes()).slice(-2),
    second = ('0' + date.getSeconds()).slice(-2)
  // 拼接
  result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second
  // 返回
  return result
}

/**
 * 日期格式化
 * fmt，时间格式
 * date，给定时间
 * **/
export const dateFormatSet = (fmt: any, date: any) => {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}
