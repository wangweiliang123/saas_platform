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
// logger
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date().getTime();
    yield next();
    const ms = new Date().getTime() - start;
    ctx.util.logger.logConsole(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));
// routes
app.use(registerRouter());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
module.exports = app;
