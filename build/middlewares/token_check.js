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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = require("../utils/timer");
var logUtil = require('../logger/log4Util');
var system_config_1 = require("../configs/system.config");
var tokenCheck = function (ctx, next, type) { return __awaiter(void 0, void 0, void 0, function () {
    var url, errInfo_1, headerToken_1, sessionToken, tokenInfo_1, userId, redisTokenKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((system_config_1.checkToken !== true && type !== 1) || system_config_1.uncheckToken)) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [3 /*break*/, 10];
            case 2:
                url = ctx.url.split('?')[0];
                if (!(url === '/system/login' || url === '/system/register')) return [3 /*break*/, 4];
                return [4 /*yield*/, next()];
            case 3:
                _a.sent();
                return [3 /*break*/, 10];
            case 4:
                errInfo_1 = '用户未登录或登录已过期';
                headerToken_1 = ctx.request.headers['authorization'] || ctx.request.headers['token'];
                sessionToken = ctx.session.token;
                if (!headerToken_1) {
                    console.log('此处存在token篡改行为，需发警告邮件');
                    logUtil.logDanger(ctx, '未携带token请求', timer_1.formatTime(new Date().getTime()));
                    ctx.status = 203;
                    ctx.body = {
                        errMessage: '用户登录信息错误，请重新登录',
                    };
                    return [2 /*return*/];
                }
                if (!(headerToken_1 !== sessionToken)) return [3 /*break*/, 5];
                console.log('此处存在token篡改行为，需发警告邮件');
                logUtil.logDanger(ctx, 'headerToken与sessionToken不一致', timer_1.formatTime(new Date().getTime()));
                ctx.status = 203;
                ctx.body = {
                    errMessage: '用户登录信息错误，请重新登录',
                };
                return [2 /*return*/];
            case 5:
                tokenInfo_1 = ctx.util.token.getToken(headerToken_1);
                if (!!tokenInfo_1) return [3 /*break*/, 6];
                ctx.status = 203;
                ctx.body = {
                    errMessage: errInfo_1,
                };
                return [2 /*return*/];
            case 6:
                if (!ctx.request.header['user-agent'] || !ctx.request.headers['hardware']) {
                    logUtil.logDanger(ctx, '请求未携带硬件信息', timer_1.formatTime(new Date().getTime()));
                    ctx.status = 203;
                    ctx.body = {
                        errMessage: '用户登录信息错误，请重新登录',
                    };
                    return [2 /*return*/];
                }
                else {
                    if (ctx.request.header['user-agent'] !== ctx.request.headers['hardware']) {
                        console.log('此处存在token篡改行为，需发警告邮件');
                        logUtil.logDanger(ctx, '请求硬件信息不一致', timer_1.formatTime(new Date().getTime()));
                        ctx.status = 203;
                        ctx.body = {
                            errMessage: '用户登录信息错误，请重新登录',
                        };
                        return [2 /*return*/];
                    }
                }
                userId = tokenInfo_1.userId;
                redisTokenKey = userId + "_token";
                return [4 /*yield*/, ctx.util.redis.redisToken.getString(redisTokenKey).then(function (res) {
                        if (res.dataStatus === 1) {
                            var redisToken = res.result;
                            if (redisToken !== headerToken_1) {
                                console.log('此处存在token篡改行为，需发警告邮件');
                                logUtil.logDanger(ctx, 'headerToken与redisToken不一致', timer_1.formatTime(new Date().getTime()));
                                ctx.status = 203;
                                ctx.body = {
                                    errMessage: '用户登录信息错误，请重新登录',
                                };
                                return;
                            }
                            else {
                                var timeNow = new Date().getTime();
                                var overTime = Number(tokenInfo_1.exp || 0);
                                if (timeNow > overTime) {
                                    ctx.status = 203;
                                    ctx.body = {
                                        errMessage: '登录信息已过期，请重新登录',
                                    };
                                    return;
                                }
                            }
                        }
                        else {
                            ctx.status = 203;
                            ctx.body = {
                                errMessage: errInfo_1,
                            };
                            return;
                        }
                    })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, next()];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
module.exports = tokenCheck;
