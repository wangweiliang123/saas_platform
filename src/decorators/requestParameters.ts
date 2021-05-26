import { checkRequestParametersSetting } from '../configs/system.config'
export function checkRequestParameters(requestParameters: Array<string>) {
  // requestParameters为必传参数
  return (target: any, name: string, descriptor: any) => {
    const fn = descriptor.value
    return {
      ...descriptor,
      value(ctx: any, next: any) {
        if (checkRequestParametersSetting && requestParameters && requestParameters.length) {
          let result = true
          let parameterName = ''
          const method = ctx.request.method || 'get'
          let requestGet = null
          if (method.toLowerCase() === 'get') {
            requestGet = ctx.request.query
          } else if (method.toLowerCase() === 'post') {
            requestGet = ctx.request.body
          }
          if (!requestGet) {
            requestGet = false
          } else {
            for (let i = 0; i < requestParameters.length; i++) {
              if (requestParameters[i] && !requestGet[requestParameters[i]]) {
                parameterName = requestParameters[i]
                result = false
                break
              }
            }
          }
          if (!result) {
            ctx.status = 400
            ctx.body = {
              errMessage: `缺少请求参数${parameterName}`,
            }
            return
          }
        }
        return fn(ctx, next)
      },
    }
  }
}
