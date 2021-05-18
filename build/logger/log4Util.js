"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = require('log4js');
var logConfig = require('./log4js');
// 加载配置文件
log4js.configure(logConfig);
var logUtil = {
    logError: {},
    logWarning: {},
    logRecord: {},
    logRequest: {},
    logResponse: {},
    logConsole: {},
    logInfo: {},
    logSql: {},
    logDanger: {},
};
// 调用预先定义的日志名称
var resLogger = log4js.getLogger('resLogger');
var reqLogger = log4js.getLogger('http');
var errorLogger = log4js.getLogger('errorLogger');
var infoLogger = log4js.getLogger('infoLogger');
var sqlLogger = log4js.getLogger('sqlLogger');
var dangerLogger = log4js.getLogger('dangerLogger');
var recordLogger = log4js.getLogger('recordLogger');
var warningLogger = log4js.getLogger('warningLogger');
var consoleLogger = log4js.getLogger();
//封装系统记录
logUtil.logRecord = function (info, ctx, resTime) {
    if (ctx) {
        recordLogger.info(formatRecordLog(info, ctx, resTime));
    }
};
//封装系统警告
logUtil.logWarning = function (info, ctx, resTime) {
    if (ctx) {
        warningLogger.info(formatWarningLog(info, ctx, resTime));
    }
};
//封装危险日志
logUtil.logDanger = function (ctx, info, resTime) {
    if (ctx) {
        dangerLogger.info(formatDangerLog(ctx, info, resTime));
    }
};
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
//格式化Warning日志
var formatWarningLog = function (info, ctx, resTime) {
    var logText = '';
    // 系统警告日志开始
    logText += '\n' + '*************** warning log start ***************' + '\n';
    // 系统警告内容
    logText += 'warning detail: ' + '\n' + JSON.stringify(info) + '\n';
    //请求信息
    logText += formatReqLog(ctx, resTime, 0) + '\n';
    // 系统警告日志结束
    logText += '*************** warning log end ***************' + '\n';
    return logText;
};
//格式化Record日志
var formatRecordLog = function (info, ctx, resTime) {
    var logText = '';
    // 系统记录日志开始
    logText += '\n' + '*************** record log start ***************' + '\n';
    // 系统记录内容
    logText += 'Record detail: ' + '\n' + JSON.stringify(info) + '\n';
    //请求信息
    logText += formatReqLog(ctx, resTime, 0) + '\n';
    // 系统记录日志结束
    logText += '*************** record log end ***************' + '\n';
    return logText;
};
//格式化danger日志
var formatDangerLog = function (ctx, info, resTime) {
    var logText = '';
    // 危险日志开始
    logText += '\n' + '*************** danger log start ***************' + '\n';
    // 危险内容
    logText += 'danger detail: ' + '\n' + JSON.stringify(info) + '\n';
    //请求信息
    logText += formatReqLog(ctx, resTime, 0) + '\n';
    // 危险日志结束
    logText += '*************** danger log end ***************' + '\n';
    return logText;
};
//格式化sql日志
var formatSqlLog = function (info, ctx, resTime) {
    var req = null;
    if (ctx) {
        req = ctx.request;
    }
    var method = '' || req ? req.method : '';
    var logText = '';
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
var formatConsoleLog = function (info) {
    var logText = '';
    // 打印日志开始
    logText += '\n' + '*************** console log start ***************' + '\n';
    // 打印内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 打印日志结束
    logText += '*************** console log end ***************' + '\n';
    return logText;
};
//格式化消息日志
var formatInfoLog = function (info, ctx, resTime) {
    var req = null;
    if (ctx) {
        req = ctx.request;
    }
    var method = '' || req ? req.method : '';
    var logText = '';
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
var formatResLog = function (ctx, resTime) {
    var logText = '';
    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx, resTime, 0);
    // 响应状态码
    logText += '\n' + 'response status: ' + ctx.status + '\n';
    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(ctx.body || '') + '\n';
    // 响应日志结束
    logText += '*************** response log end ***************' + '\n';
    return logText;
};
// 格式化错误日志
var formatErrorLog = function (ctx, err, resTime) {
    var logText = '';
    // 错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n';
    // 添加请求日志
    if (ctx) {
        logText += formatReqLog(ctx, resTime, 0);
    }
    // 错误名称
    logText += 'err name: ' + ("" + (err.name || '')) + '\n';
    // 错误信息
    logText += 'err message: ' + ("" + (err.message || '')) + '\n';
    // 错误详情
    logText += 'err stack: ' + ("" + (err.stack || '')) + '\n';
    //错误info
    logText += 'err info: ' + JSON.stringify(err) + '\n';
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n';
    return logText;
};
// 格式化请求日志
var formatReqLog = function (ctx, resTime, type) {
    var logText = '';
    var userId = '';
    var userName = '';
    var req = ctx.request;
    var headerToken = ctx.request.headers['authorization'] || ctx.request.headers['token'];
    if (headerToken) {
        var tokenInfo = ctx.util.token.getToken(headerToken);
        if (tokenInfo) {
            userId = tokenInfo.userId || '';
            userName = tokenInfo.userName || '';
        }
    }
    var method = req ? req.method : '';
    // 响应信息开始
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
    //请求用户id
    logText += 'request userId: ' + userId + '\n';
    //请求用户名
    logText += 'request userName: ' + userName + '\n';
    // 服务器响应时间
    logText += '\n' + 'response time: ' + resTime || '' + '\n';
    if (ctx && ctx.body) {
        //请求开始时间
        logText += '\n' + 'request startTime: ' + ctx.body.startTime || '' + '\n';
        //请求结束时间
        logText += '\n' + 'response endTime: ' + ctx.body.endTime || '' + '\n';
        //相应时长
        logText += '\n' + 'response duration: ' + ctx.body.exeTime || '' + '\n';
    }
    // 响应信息结束
    if (type === 1) {
        logText += '\n' + '*************** request log end ***************' + '\n';
    }
    return logText;
};
module.exports = logUtil;
