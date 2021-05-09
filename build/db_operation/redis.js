'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var RedisConfigGet = require('../configs/redis.config')
var Redis = require('koa-redis')
var logUtil = require('../logger/log4Util')
var timer_1 = require('../utils/timer')
var clientCreate = function (config, callback_) {
  var redis = new Redis(config)
  redis.on('connect', function () {
    //根据 connect 事件判断连接成功
    callback_(null, redis) //链接成功， 返回 redis 连接对象
  })
  redis.on('error', function (err) {
    //根据 error 事件判断连接失败
    callback_(err, null) //捕捉异常， 返回 error
  })
}
var redisConn = function (options) {
  var config = options
  return new Promise(function (resolve, reject) {
    //返回API调用方 一个 promise 对象
    clientCreate(config, function (err, conn) {
      if (err) {
        reject(err)
      }
      resolve(conn) //返回连接的redis对象
    })
  })
}
var RedisTool = /** @class */ (function () {
  function RedisTool(opt) {
    this.redis = null
    if (opt) {
      this.config = Object.assign(RedisConfigGet, opt)
    } else {
      this.config = RedisConfigGet
    }
    this.connToRedis()
      .then(function (res) {
        if (res) {
          logUtil.logSql('连接Redis成功', '', timer_1.formatTime(new Date().getTime()))
        }
      })
      .catch(function (err) {
        logUtil.logSql(JSON.stringify(err), '', timer_1.formatTime(new Date().getTime()))
      })
  }
  /**连接redis */
  RedisTool.prototype.connToRedis = function () {
    var _this = this
    return new Promise(function (resolve, reject) {
      if (_this.redis) {
        resolve(true) //已创建
      } else {
        redisConn(_this.config)
          .then(function (resp) {
            _this.redis = resp
            resolve(true)
          })
          .catch(function (err) {
            reject(err)
          })
      }
    })
  }
  /**存储string类型的key-value */
  RedisTool.prototype.setString = function (key, value, overTime) {
    if (overTime === void 0) {
      overTime = -1
    }
    return __awaiter(this, void 0, void 0, function () {
      var val, k, res, err_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            val = typeof value !== 'string' ? JSON.stringify(value) : value
            k = typeof value !== 'string' ? JSON.stringify(key) : key
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4 /*yield*/, this.redis.set(k, val, overTime)]
          case 2:
            res = _a.sent()
            return [
              2 /*return*/,
              {
                dataStatus: 1,
                errInfo: '',
                errMessage: '',
                successMessage: 'Redis设置值成功',
                result: res || val,
              },
            ]
          case 3:
            err_1 = _a.sent()
            logUtil.logSql(JSON.stringify(err_1), '', timer_1.formatTime(new Date().getTime()))
            return [
              2 /*return*/,
              {
                dataStatus: 0,
                errInfo: err_1,
                errMessage: 'Redis设置值失败',
                successMessage: '',
                result: '',
              },
            ]
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**获取string类型的key-value */
  RedisTool.prototype.getString = function (key) {
    return __awaiter(this, void 0, void 0, function () {
      var id, res, err_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = typeof key !== 'string' ? JSON.stringify(key) : key
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4 /*yield*/, this.redis.get(id)]
          case 2:
            res = _a.sent()
            return [
              2 /*return*/,
              {
                dataStatus: 1,
                errInfo: '',
                errMessage: '',
                successMessage: 'Redis获取值成功',
                result: res,
              },
            ]
          case 3:
            err_2 = _a.sent()
            logUtil.logSql(JSON.stringify(err_2), '', timer_1.formatTime(new Date().getTime()))
            return [
              2 /*return*/,
              {
                dataStatus: 0,
                errInfo: err_2,
                errMessage: 'Redis获取值失败',
                successMessage: '',
                result: '',
              },
            ]
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**删除string类型的key-value */
  RedisTool.prototype.delString = function (key) {
    return __awaiter(this, void 0, void 0, function () {
      var id, res, err_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = typeof key !== 'string' ? JSON.stringify(key) : key
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4 /*yield*/, this.redis.destroy(id)]
          case 2:
            res = _a.sent()
            return [
              2 /*return*/,
              {
                dataStatus: 1,
                errInfo: '',
                errMessage: '',
                successMessage: 'Redis删除值成功',
                result: res,
              },
            ]
          case 3:
            err_3 = _a.sent()
            logUtil.logSql(JSON.stringify(err_3), '', timer_1.formatTime(new Date().getTime()))
            return [
              2 /*return*/,
              {
                dataStatus: 0,
                errInfo: err_3,
                errMessage: 'Redis删除值失败',
                successMessage: '',
                result: '',
              },
            ]
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**获取当前数据库key的数量 */
  RedisTool.prototype.getDbSize = function () {
    return __awaiter(this, void 0, void 0, function () {
      var res, err_4
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4 /*yield*/, this.redis.dbsize()]
          case 1:
            res = _a.sent()
            return [
              2 /*return*/,
              {
                dataStatus: 1,
                errInfo: '',
                errMessage: '',
                successMessage: 'Redis查询Size成功',
                result: res,
              },
            ]
          case 2:
            err_4 = _a.sent()
            logUtil.logSql(JSON.stringify(err_4), '', timer_1.formatTime(new Date().getTime()))
            return [
              2 /*return*/,
              {
                dataStatus: 0,
                errInfo: err_4,
                errMessage: 'Redis查询Size失败',
                successMessage: '',
                result: '',
              },
            ]
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  return RedisTool
})()
var redisCommon = new RedisTool({ db: 0 })
var redisMessage = new RedisTool({ db: 1 })
var redisToken = new RedisTool({ db: 2 })
var redisSysData = new RedisTool({ db: 3 })
var redisOther = new RedisTool({ db: 4 })
module.exports = {
  redisCommon: redisCommon,
  redisMessage: redisMessage,
  redisToken: redisToken,
  redisSysData: redisSysData,
  redisOther: redisOther,
}
