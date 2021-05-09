"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refererList = exports.uncheckReferer = exports.checkReferer = exports.uncheckToken = exports.checkToken = exports.tokenExpiresIn = exports.tokenSecret = exports.redisDatabaseForSession = exports.sessionMaxAge = exports.sessionName = exports.sessionRedis = exports.appKeys = void 0;
//加密依赖
var Keygrip = require('keygrip');
//session,cookie加密key
exports.appKeys = new Keygrip(['kjasdfjdl56sadfs', 'a4dfa54asdfwasd514'], 'sha256');
// session对象在redis存储的地址名前面添加的前缀
exports.sessionRedis = 'appSession';
// 前端储存的session名
exports.sessionName = 'sessionForApp';
// session过期时间
exports.sessionMaxAge = 7 * 24 * 60 * 60 * 1000;
// 储存的session的redis数据库
exports.redisDatabaseForSession = 10;
// token加密串
exports.tokenSecret = 'asd5=45as_pdf./}.99adf';
// token过期时间
exports.tokenExpiresIn = '7d';
//全局校验token
exports.checkToken = true;
//不校验token
exports.uncheckToken = true;
//全局校验Referer
exports.checkReferer = true;
//不校验Referer
exports.uncheckReferer = true;
// 允许的referer
exports.refererList = ['localhost', '192.168.'];
