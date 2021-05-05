const UserService = require("../services/user_service");
module.exports = {
    add: async (ctx:any, next:any) => {
        UserService.getUserAll(ctx, next).then((res:any)=>{
            console.log(res)
            ctx.body = res
        })
    }
}