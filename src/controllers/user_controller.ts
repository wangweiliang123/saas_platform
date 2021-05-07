export {}
const UserService = require('../services/user_service')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { User } = require('../models/user_model')
module.exports = {
  add: async (ctx: any) => {
    await UserService.getUserAll(ctx, [
      {
        key: 'nickname',
        showKey: 'name',
      },
      {
        key: 'create_date',
      },
    ])
      .then((res: any) => {
        ctx.body = res
      })
      .catch((err: any) => {
        ctx.body = err
      })
  },
}
