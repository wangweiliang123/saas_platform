export {}
const UserService = require('../services/user_service')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { User } = require('../models/mysql_models/user_model')
import { checkRequestMethod } from '../decorators/requestMethod'
import { checkRequestParameters } from '../decorators/requestParameters'
class userController {
  @checkRequestMethod(['get'])
  @checkRequestParameters(['id'])
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
