"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require('log4js');
const logConfig = require('./log4js');
// 加载配置文件
log4js.configure(logConfig);
const logUtil = {
    logError: {},
    logRequest: {},
    logResponse: {},
    logConsole: {},
    logInfo: {},
    logSql: {},
};
// 调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger');
const reqLogger = log4js.getLogger('http');
const errorLogger = log4js.getLogger('errorLogger');
const infoLogger = log4js.getLogger('infoLogger');
const sqlLogger = log4js.getLogger('sqlLogger');
const consoleLogger = log4js.getLogger();
// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatErrorLog(ctx, error, resTime));
    }
};
// 封装请求日志
logUtil.logRequest = function (ctx, resTime) {
    if (ctx) {
        reqLogger.info(formatReqLog(ctx, resTime, 1));
    }
};
// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatResLog(ctx, resTime));
    }
};
//封装打印日志
logUtil.logConsole = function (info) {
    if (info) {
        consoleLogger.info(formatConsoleLog(info));
    }
};
//封装信息日志
logUtil.logInfo = function (info, ctx, resTime) {
    if (info) {
        infoLogger.info(formatInfoLog(info, ctx, resTime));
    }
};
//封装sql日志
logUtil.logSql = function (sql, ctx, resTime) {
    if (sql) {
        sqlLogger.info(formatSqlLog(sql, ctx, resTime));
    }
};
//格式化sql日志
const formatSqlLog = function (info, ctx, resTime) {
    let req = null;
    if (ctx) {
        req = ctx.request;
    }
    const method = '' || req ? req.method : '';
    let logText = '';
    // sql日志开始
    logText += '\n' + '*************** sql log start ***************' + '\n';
    // sql内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 访问方法
    if (ctx) {
        logText += '\n' + 'request method: ' + method + '\n';
        //请求完整url
        logText += 'request Url:  ' + (ctx.request.href || '') + '\n';
        // 请求原始地址
        logText += 'request originalUrl:  ' + req.originalUrl + '\n';
        // 客户端ip
        logText += 'request client ip:  ' + req.ip + '\n';
        // 请求参数
        if (method === 'GET') {
            logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
        }
        else {
            logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
        }
        // 响应内容
        logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
    }
    // 服务器响应时间
    if (resTime) {
        logText += 'response time: ' + resTime + '\n';
    }
    // sql日志结束
    logText += '*************** sql log end ***************' + '\n';
    return logText;
};
//格式化打印日志
const formatConsoleLog = function (info) {
    let logText = '';
    // 打印日志开始
    logText += '\n' + '*************** console log start ***************' + '\n';
    // 打印内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 打印日志结束
    logText += '*************** console log end ***************' + '\n';
    return logText;
};
//格式化消息日志
const formatInfoLog = function (info, ctx, resTime) {
    let req = null;
    if (ctx) {
        req = ctx.request;
    }
    const method = '' || req ? req.method : '';
    let logText = '';
    // 消息日志开始
    logText += '\n' + '*************** info log start ***************' + '\n';
    // 消息内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 访问方法
    if (ctx) {
        logText += '\n' + 'request method: ' + method + '\n';
        //请求完整url
        logText += 'request Url:  ' + (ctx.request.href || '') + '\n';
        // 请求原始地址
        logText += 'request originalUrl:  ' + req.originalUrl + '\n';
        // 客户端ip
        logText += 'request client ip:  ' + req.ip + '\n';
        // 请求参数
        if (method === 'GET') {
            logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
        }
        else {
            logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
        }
        // 响应内容
        logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
    }
    // 服务器响应时间
    if (resTime) {
        logText += 'response time: ' + resTime + '\n';
    }
    // 消息日志结束
    logText += '*************** info log end ***************' + '\n';
    return logText;
};
// 格式化响应日志
const formatResLog = function (ctx, resTime) {
    let logText = '';
    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime, 0);
    // 响应状态码
    logText += 'response status: ' + ctx.status + '\n';
    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(ctx.body || '') + '\n';
    // 响应日志结束
    logText += '*************** response log end ***************' + '\n';
    return logText;
};
// 格式化错误日志
const formatErrorLog = function (ctx, err, resTime) {
    let logText = '';
    // 错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime, 0);
    // 错误名称
    logText += 'err name: ' + err.name + '\n';
    // 错误信息
    logText += 'err message: ' + err.message + '\n';
    // 错误详情
    logText += 'err stack: ' + err.stack + '\n';
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n';
    return logText;
};
// 格式化请求日志
const formatReqLog = function (req, resTime, type) {
    let logText = '';
    const method = req ? req.method : '';
    // 响应信息结束
    if (type === 1) {
        logText += '\n' + '*************** request log start ***************' + '\n';
    }
    // 访问方法
    logText += '\n' + 'request method: ' + method + '\n';
    if (req) {
        //请求完整url
        logText += 'request Url:  ' + (req.href || '') + '\n';
        // 请求原始地址
        logText += 'request originalUrl:  ' + (req.originalUrl || '') + '\n';
        // 客户端ip
        logText += 'request client ip:  ' + (req.ip || '') + '\n';
    }
    // 请求参数
    if (method === 'GET') {
        logText += 'request query:  ' + JSON.stringify(req ? req.query : '') + '\n';
    }
    else {
        logText += 'request body: ' + '\n' + JSON.stringify(req ? req.body : '') + '\n';
    }
    // 服务器响应时间
    logText += 'response time: ' + resTime || '' + '\n';
    // 响应信息结束
    if (type === 1) {
        logText += '\n' + '*************** request log end ***************' + '\n';
    }
    return logText;
};
module.exports = logUtil;
