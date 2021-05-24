export {}
const UserService = require('../services/user_service')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { User } = require('../models/mysql_models/user_model')
class userController {
  async add(ctx: any) {
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
  }
}
module.exports = new userController()
