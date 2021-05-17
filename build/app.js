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
var path = require('path');
var staticPath = path.join(__dirname, '../public'); // 静态地址
var viewsPath = path.join(__dirname, '../views'); // 模板地址
var Koa = require('koa');
var app = new Koa();
var views = require('koa-views');
var json = require('koa-json');
var error = require('koa-onerror');
var bodyparser = require('koa-bodyparser');
var registerRouter = require('./routers');
var session = require('koa-generic-session');
var RedisGet = require('koa-redis');
var RedisConfig = require('./configs/redis.config');
var refererCheck = require('./middlewares/referer_check');
var tokenCheck = require('./middlewares/token_check');
var schedules = require('./schedules');
var timer_1 = require("./utils/timer");
var system_config_1 = require("./configs/system.config");
//设置系统参数
app.keys = system_config_1.appKeys;
// error handler
error(app);
// middlewares
/*
 通过一个中间件，把所有的工具关联起来
*/
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //挂载到util中
                ctx.util = {
                    mysql: require('./db_operation/mysql'),
                    mongo: require('./db_operation/mongodb'),
                    logger: require('./logger/log4Util'),
                    redis: require('./db_operation/redis'),
                    token: require('./token_settings'),
                };
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//设置Session
app.use(session({
    prefix: system_config_1.sessionRedis,
    HttpOnly: true,
    key: system_config_1.sessionName,
    cookie: {
        maxAge: system_config_1.sessionMaxAge,
    },
    store: new RedisGet({
        port: RedisConfig.port,
        host: RedisConfig.host,
        password: RedisConfig.password,
        db: system_config_1.redisDatabaseForSession,
    }), // 在Redis中放入一个session对象
}));
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(require('koa-static')(staticPath));
app.use(views(viewsPath, {
    extension: 'pug',
}));
// logger及字段封装
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var start;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.util.logger.logRequest(ctx, timer_1.formatTime(new Date().getTime()));
                start = new Date().getTime();
                ctx.startTime = start;
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                ctx.endTime = new Date().getTime();
                ctx.exeTime = ctx.endTime - ctx.startTime;
                //封装固定字段
                if (ctx.body) {
                    ctx.body.statusCode = ctx.status;
                    ctx.body.startTime = ctx.startTime;
                    ctx.body.endTime = ctx.endTime;
                    ctx.body.exeTime = ctx.exeTime;
                    if (system_config_1.responseWarning && ctx.body.exeTime > parseInt(String(system_config_1.responseWarning))) {
                        ctx.util.logger.logWarning('系统警告：相应时间过长', ctx, timer_1.formatTime(new Date().getTime()));
                    }
                    if (ctx.body.dataStatus === undefined) {
                        ctx.body.dataStatus = '';
                    }
                    if (ctx.body.errInfo === undefined) {
                        ctx.body.errInfo = '';
                    }
                    if (ctx.body.errMessage === undefined) {
                        ctx.body.errMessage = '';
                    }
                    if (ctx.body.successMessage === undefined) {
                        ctx.body.successMessage = '';
                    }
                    if (ctx.body.result === undefined) {
                        ctx.body.result = '';
                    }
                }
                ctx.util.logger.logConsole(ctx.method + " " + ctx.url + " - " + ctx.exeTime + "ms");
                ctx.util.logger.logResponse(ctx, timer_1.formatTime(new Date().getTime()));
                return [2 /*return*/];
        }
    });
}); });
//referer检查
app.use(refererCheck);
//token检查
app.use(tokenCheck);
// routes
app.use(registerRouter());
// error-handling
app.on('error', function (err, ctx) {
    ctx.util.logger.logError(ctx, err, timer_1.formatTime(new Date().getTime()));
});
//定时任务
schedules();
module.exports = app;
