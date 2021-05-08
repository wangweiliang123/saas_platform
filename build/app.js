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
const path = require('path');
const staticPath = path.join(__dirname, '../public'); // 静态地址
const viewsPath = path.join(__dirname, '../views'); // 模板地址
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const error = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const registerRouter = require('./routers');
const timer_1 = require("./utils/timer");
// error handler
error(app);
// middlewares
/*
 通过一个中间件，把所有的工具关联起来
*/
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    //挂载到util中
    ctx.util = {
        mysql: require('./db_operation/mysql'),
        mongo: require('./db_operation/mongodb'),
        logger: require('./logger/log4Util'),
    };
    yield next();
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
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.util.logger.logRequest(ctx, timer_1.formatTime(new Date().getTime()));
    const start = new Date().getTime();
    ctx.startTime = start;
    yield next();
    ctx.endTime = new Date().getTime();
    ctx.exeTime = ctx.endTime - ctx.startTime;
    //封装固定字段
    if (ctx.body) {
        ctx.body.statusCode = ctx.status;
        ctx.body.startTime = ctx.startTime;
        ctx.body.endTime = ctx.endTime;
        ctx.body.exeTime = ctx.exeTime;
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
    ctx.util.logger.logConsole(`${ctx.method} ${ctx.url} - ${ctx.exeTime}ms`);
    ctx.util.logger.logResponse(ctx, timer_1.formatTime(new Date().getTime()));
}));
// routes
app.use(registerRouter());
// error-handling
app.on('error', (err, ctx) => {
    ctx.util.logger.logError(ctx, err, timer_1.formatTime(new Date().getTime()));
});
module.exports = app;
