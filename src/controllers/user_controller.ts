const UserService = require('../services/user_service')
module.exports = {
  add: async (ctx: any, next: any) => {
    await UserService.getUserAll(ctx, next)
      .then((res: any) => {
        ctx.body = res
      })
      .catch((err: any) => {
        ctx.body = err
      })
  },
}
