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
var sendEmails = require('../email_settings');
var logUtil = require('../logger/log4Util');
var system_config_1 = require("../configs/system.config");
var securityCheck = function (ctx, next, type) { return __awaiter(void 0, void 0, void 0, function () {
    var requestMap, errInfo, hostGet, ipGet, obj, urlList, timeList, i, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((system_config_1.checkSecurity !== true && type !== 1) || system_config_1.uncheckSecurity)) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [3 /*break*/, 9];
            case 2:
                requestMap = ctx.session.requestMap;
                errInfo = '存在安全风险，系统拒绝访问';
                hostGet = ctx.host;
                ipGet = ctx.ip;
                obj = {
                    url: ctx.originalUrl,
                    timeStamp: new Date().getTime(),
                };
                if (!(requestMap && requestMap.length)) return [3 /*break*/, 3];
                requestMap.push(obj);
                if (requestMap.length > 6) {
                    requestMap.shift();
                }
                urlList = [];
                timeList = [];
                for (i = 0; i < requestMap.length; i++) {
                    urlList.push(requestMap[i].url);
                    timeList.push(requestMap[i].timeStamp);
                }
                if (timeList.length > 0 && timeList[timeList.length - 1] - timeList[0] < 1000) {
                    if (timeList.length > 2) {
                        console.log('此处有强刷接口风险，需发警告邮件');
                        sendEmails(system_config_1.systemAcceptEmailList, "\u98CE\u9669\u63D0\u793A\uFF1A\u5B58\u5728\u5F3A\u5237\u63A5\u53E3\u98CE\u9669,\u8BF7\u6C42\u4F53\uFF1A" + JSON.stringify(ctx.request), '系统报警');
                        logUtil.logDanger(ctx, '存在强刷接口风险', timer_1.formatTime(new Date().getTime()));
                    }
                }
                return [3 /*break*/, 7];
            case 3:
                url = ctx.url.split('?')[0];
                if (!(url === '/system/login' || url === '/system/register')) return [3 /*break*/, 5];
                requestMap = [];
                requestMap.push(obj);
                ctx.session.requestMap = requestMap;
                return [4 /*yield*/, next()];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                console.log('此处RequestMap为空，需发警告邮件');
                sendEmails(system_config_1.systemAcceptEmailList, "\u98CE\u9669\u63D0\u793A\uFF1A\u8BF7\u6C42\u672A\u643A\u5E26RequestMap,\u8BF7\u6C42\u4F53\uFF1A" + JSON.stringify(ctx.request), '系统报警');
                logUtil.logDanger(ctx, '请求未携带RequestMap', timer_1.formatTime(new Date().getTime()));
                return [4 /*yield*/, ctx.util.redis.redisBlacklist.setString(ipGet, 1, system_config_1.timerList[6])];
            case 6:
                _a.sent();
                ctx.status = 203;
                ctx.body = {
                    errMessage: errInfo,
                };
                return [2 /*return*/];
            case 7: return [4 /*yield*/, next()];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
module.exports = securityCheck;
