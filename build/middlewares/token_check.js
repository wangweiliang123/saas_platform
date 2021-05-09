"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_config_1 = require("../configs/system.config");
const tokenCheck = (ctx, next, type) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(55555666);
    if ((system_config_1.checkToken !== true && type !== 1) || system_config_1.uncheckToken) {
        yield next();
    }
    else {
        const url = ctx.url.split('?')[0];
        if (url === '/system/login' || url === '/system/register') {
            yield next();
        }
        else {
            // 获取到token
            const errInfo = '用户未登录或登录已过期';
            const headerToken = ctx.request.headers['authorization'] || ctx.request.headers['token'];
            const sessionToken = ctx.session.token;
            if (headerToken !== sessionToken) {
                console.log('此处存在token篡改行为，需发警告邮件');
                ctx.throw(203);
                ctx.body.errMessage = '用户登录信息错误，请重新登录';
                return;
            }
            else {
                const tokenInfo = ctx.util.token.getToken(headerToken);
                if (!tokenInfo) {
                    ctx.throw(203);
                    ctx.body.errMessage = errInfo;
                    return;
                }
                else {
                    if (!ctx.request.header.userAgent || !ctx.request.headers['hardware']) {
                        ctx.throw(203);
                        ctx.body.errMessage = '用户登录信息错误，请重新登录';
                        return;
                    }
                    else {
                        if (ctx.request.header['user-agent'] !== ctx.request.headers['hardware']) {
                            console.log('此处存在token篡改行为，需发警告邮件');
                            ctx.throw(203);
                            ctx.body.errMessage = '用户登录信息错误，请重新登录';
                            return;
                        }
                    }
                    const userId = tokenInfo.userId;
                    const redisTokenKey = `${userId}_token`;
                    yield ctx.util.redis.redisToken.getString(redisTokenKey).then((res) => {
                        if (res.dataStatus === 1) {
                            const redisToken = res.result;
                            if (redisToken !== headerToken) {
                                console.log('此处存在token篡改行为，需发警告邮件');
                                ctx.throw(203);
                                ctx.body.errMessage = '用户登录信息错误，请重新登录';
                                return;
                            }
                            else {
                                const timeNow = new Date().getTime();
                                const overTime = Number(tokenInfo.exp || 0);
                                if (timeNow > overTime) {
                                    ctx.throw(203);
                                    ctx.body.errMessage = '登录信息已过期，请重新登录';
                                    return;
                                }
                            }
                        }
                        else {
                            ctx.throw(203);
                            ctx.body.errMessage = errInfo;
                            return;
                        }
                    });
                }
            }
        }
    }
});
module.exports = tokenCheck;
