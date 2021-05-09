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
const RedisConfigGet = require('../configs/redis.config');
const Redis = require('koa-redis');
const logUtil = require('../logger/log4Util');
const timer_1 = require("../utils/timer");
const clientCreate = (config, callback_) => {
    const redis = new Redis(config);
    redis.on('connect', () => {
        //根据 connect 事件判断连接成功
        callback_(null, redis); //链接成功， 返回 redis 连接对象
    });
    redis.on('error', (err) => {
        //根据 error 事件判断连接失败
        callback_(err, null); //捕捉异常， 返回 error
    });
};
const redisConn = (options) => {
    const config = options;
    return new Promise((resolve, reject) => {
        //返回API调用方 一个 promise 对象
        clientCreate(config, (err, conn) => {
            if (err) {
                reject(err);
            }
            resolve(conn); //返回连接的redis对象
        });
    });
};
class RedisTool {
    constructor(opt) {
        this.redis = null;
        if (opt) {
            this.config = Object.assign(RedisConfigGet, opt);
        }
        else {
            this.config = RedisConfigGet;
        }
        this.connToRedis()
            .then((res) => {
            if (res) {
                logUtil.logSql('连接Redis成功', '', timer_1.formatTime(new Date().getTime()));
            }
        })
            .catch((err) => {
            logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()));
        });
    }
    /**连接redis */
    connToRedis() {
        return new Promise((resolve, reject) => {
            if (this.redis) {
                resolve(true); //已创建
            }
            else {
                redisConn(this.config)
                    .then((resp) => {
                    this.redis = resp;
                    resolve(true);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
        });
    }
    /**存储string类型的key-value */
    setString(key, value, overTime = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = typeof value !== 'string' ? JSON.stringify(value) : value;
            const k = typeof value !== 'string' ? JSON.stringify(key) : key;
            try {
                const res = yield this.redis.set(k, val, overTime);
                return {
                    dataStatus: 1,
                    errInfo: '',
                    errMessage: '',
                    successMessage: 'Redis设置值成功',
                    result: res || val,
                };
            }
            catch (err) {
                logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()));
                return {
                    dataStatus: 0,
                    errInfo: err,
                    errMessage: 'Redis设置值失败',
                    successMessage: '',
                    result: '',
                };
            }
        });
    }
    /**获取string类型的key-value */
    getString(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = typeof key !== 'string' ? JSON.stringify(key) : key;
            try {
                const res = yield this.redis.get(id);
                return {
                    dataStatus: 1,
                    errInfo: '',
                    errMessage: '',
                    successMessage: 'Redis获取值成功',
                    result: res,
                };
            }
            catch (err) {
                logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()));
                return {
                    dataStatus: 0,
                    errInfo: err,
                    errMessage: 'Redis获取值失败',
                    successMessage: '',
                    result: '',
                };
            }
        });
    }
    /**删除string类型的key-value */
    delString(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = typeof key !== 'string' ? JSON.stringify(key) : key;
            try {
                const res = yield this.redis.destroy(id);
                return {
                    dataStatus: 1,
                    errInfo: '',
                    errMessage: '',
                    successMessage: 'Redis删除值成功',
                    result: res,
                };
            }
            catch (err) {
                logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()));
                return {
                    dataStatus: 0,
                    errInfo: err,
                    errMessage: 'Redis删除值失败',
                    successMessage: '',
                    result: '',
                };
            }
        });
    }
    /**获取当前数据库key的数量 */
    getDbSize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.redis.dbsize();
                return {
                    dataStatus: 1,
                    errInfo: '',
                    errMessage: '',
                    successMessage: 'Redis查询Size成功',
                    result: res,
                };
            }
            catch (err) {
                logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()));
                return {
                    dataStatus: 0,
                    errInfo: err,
                    errMessage: 'Redis查询Size失败',
                    successMessage: '',
                    result: '',
                };
            }
        });
    }
}
const redisCommon = new RedisTool({ db: 0 });
const redisMessage = new RedisTool({ db: 1 });
const redisToken = new RedisTool({ db: 2 });
const redisSysData = new RedisTool({ db: 3 });
const redisOther = new RedisTool({ db: 4 });
module.exports = {
    redisCommon,
    redisMessage,
    redisToken,
    redisSysData,
    redisOther,
};
