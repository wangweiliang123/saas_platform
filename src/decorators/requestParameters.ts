import { checkRequestParametersSetting, parameterLength } from '../configs/system.config'
import { checkIDcard, checkPhone, checkEmail, checkInteger, regularCheck } from '../utils/validate'
export function checkRequestParameters(requestParameters: Array<any>, type = 1, paramLength?: any) {
  // requestParameters为必传参数
  return (target: any, name: string, descriptor: any) => {
    const fn = descriptor.value
    return {
      ...descriptor,
      value(ctx: any, next: any) {
        let result = true
        let errMessage = ''
        const method = ctx.request.method || 'get'
        let requestGet = null
        if (method.toLowerCase() === 'get') {
          requestGet = ctx.request.query
        } else if (method.toLowerCase() === 'post') {
          requestGet = ctx.request.body
        }
        if (type === 2) {
          if (Object.keys(requestGet).length !== requestParameters.length) {
            result = false
            if (Object.keys(requestGet).length > requestParameters.length) {
              errMessage = `请求参数过多，含有非法请求参数`
            } else {
              errMessage = `缺少必要的请求参数`
            }
          }
        }
        if (result && checkRequestParametersSetting && requestParameters && requestParameters.length) {
          if (!requestGet) {
            result = false
          } else if (result) {
            for (let i = 0; i < requestParameters.length; i++) {
              if (Object.prototype.toString.call(requestParameters[i]) === '[object String]') {
                if (requestParameters[i] && !requestGet[requestParameters[i]]) {
                  result = false
                  errMessage = `缺少请求参数${requestParameters[i]}`
                  break
                } else if (result && (parseInt(String(parameterLength)) || parseInt(String(paramLength)))) {
                  let length = parseInt(String(parameterLength))
                  if (parseInt(String(paramLength))) {
                    length = parseInt(String(paramLength))
                  }
                  if (requestGet[requestParameters[i]].length > length) {
                    result = false
                    errMessage = `请求参数${requestParameters[i]}长度过长`
                    break
                  }
                }
              } else if (Object.prototype.toString.call(requestParameters[i]) === '[object Object]') {
                if (requestParameters[i].required) {
                  if (!requestGet[requestParameters[i]]) {
                    result = false
                    errMessage = `缺少请求参数${requestParameters[i]}`
                    break
                  } else if (
                    result &&
                    (!requestParameters[i].lengthRange || !requestParameters[i].lengthRange.length)
                  ) {
                    if (result && (parseInt(String(parameterLength)) || parseInt(String(paramLength)))) {
                      let length = parseInt(String(parameterLength))
                      if (parseInt(String(paramLength))) {
                        length = parseInt(String(paramLength))
                      }
                      if (requestGet[requestParameters[i]].length > length) {
                        result = false
                        errMessage = `请求参数${requestParameters[i]}长度过长`
                        break
                      }
                    }
                  }
                } else if (
                  result &&
                  requestParameters[i].valueList &&
                  requestParameters[i].valueList.length &&
                  requestGet[requestParameters[i]]
                ) {
                  if (Object.prototype.toString.call(requestParameters[i].valueList) === '[object Array]') {
                    if (requestParameters[i].valueList.indexOf(requestGet[requestParameters[i]]) === -1) {
                      result = false
                      errMessage = `请求参数${requestParameters[i]}数值非法`
                      break
                    }
                  }
                } else if (result && requestParameters[i].type && requestGet[requestParameters[i]]) {
                  const typeList = ['tel', 'email', 'idCard', 'integer']
                  if (typeList.indexOf(requestParameters[i].type) !== -1) {
                    if (requestParameters[i].type === 'tel') {
                      const res = checkPhone(requestGet[requestParameters[i]])
                      if (!res) {
                        result = false
                        errMessage = `请求参数${requestParameters[i]}数值类型错误`
                        break
                      }
                    } else if (requestParameters[i].type === 'email') {
                      const res = checkEmail(requestGet[requestParameters[i]])
                      if (!res) {
                        result = false
                        errMessage = `请求参数${requestParameters[i]}数值类型错误`
                        break
                      }
                    } else if (requestParameters[i].type === 'idCard') {
                      const res = checkIDcard(requestGet[requestParameters[i]])
                      if (!res) {
                        result = false
                        errMessage = `请求参数${requestParameters[i]}数值类型错误`
                        break
                      }
                    } else if (requestParameters[i].type === 'integer') {
                      const res = checkInteger(requestGet[requestParameters[i]])
                      if (!res) {
                        result = false
                        errMessage = `请求参数${requestParameters[i]}数值类型错误`
                        break
                      }
                    }
                  }
                } else if (
                  result &&
                  requestParameters[i].regularList &&
                  requestParameters[i].regularList.length &&
                  requestGet[requestParameters[i]]
                ) {
                  if (Object.prototype.toString.call(requestParameters[i].regularList) === '[object Array]') {
                    let regularResult = true
                    for (let j = 0; j < requestParameters[i].regularList.length; j++) {
                      if (
                        requestParameters[i].regularList[j] &&
                        !regularCheck(requestParameters[i].regularList[j], requestGet[requestParameters[i]])
                      ) {
                        regularResult = false
                        break
                      }
                    }
                    if (!regularResult) {
                      result = false
                      errMessage = `请求参数${requestParameters[i]}不符合校验规则`
                      break
                    }
                  }
                } else if (
                  result &&
                  requestParameters[i].lengthRange &&
                  requestParameters[i].lengthRange.length &&
                  requestGet[requestParameters[i]]
                ) {
                  if (Object.prototype.toString.call(requestParameters[i].lengthRange) === '[object Array]') {
                    if (
                      String(requestGet[requestParameters[i]]).length < requestParameters[i].lengthRange[0] ||
                      String(requestGet[requestParameters[i]]).length >
                        requestParameters[i].lengthRange[requestParameters[i].lengthRange.length - 1]
                    ) {
                      result = false
                      errMessage = `请求参数${requestParameters[i]}长度错误`
                      break
                    }
                  }
                } else if (
                  result &&
                  requestParameters[i].valueRange &&
                  requestParameters[i].valueRange.length &&
                  requestGet[requestParameters[i]]
                ) {
                  if (Object.prototype.toString.call(requestParameters[i].valueRange) === '[object Array]') {
                    if (
                      (Number(requestGet[requestParameters[i]]) || 0) < requestParameters[i].valueRange[0] ||
                      (Number(requestGet[requestParameters[i]]) || 0) >
                        requestParameters[i].valueRange[requestParameters[i].valueRange.length - 1]
                    ) {
                      result = false
                      errMessage = `请求参数${requestParameters[i]}数值范围错误`
                      break
                    }
                  }
                }
              }
            }
          }
          if (!result) {
            ctx.status = 400
            ctx.body = {
              errMessage: errMessage,
            }
            return
          }
        }
        return fn(ctx, next)
      },
    }
  }
}
