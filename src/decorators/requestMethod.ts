export function checkRequestMethod(methodList: Array<string>) {
  // methodList为允许的方法
  return (target: any, name: string, descriptor: any) => {
    const fn = descriptor.value
    return {
      ...descriptor,
      value(ctx: any, next: any) {
        if (methodList && methodList.length) {
          let method = ctx.request.method
          method = method.toLowerCase()
          let result = false
          for (let i = 0; i < methodList.length; i++) {
            if (methodList[i].toLowerCase() === method) {
              result = true
              break
            }
          }
          if (!result) {
            ctx.status = 405
            ctx.body = {
              errMessage: '请求方法不被允许',
            }
            return
          }
        }
        return fn(ctx, next)
      },
    }
  }
}
