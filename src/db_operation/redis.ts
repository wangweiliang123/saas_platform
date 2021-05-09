export {}
const RedisConfigGet = require('../configs/redis.config')
const Redis = require('koa-redis')
const logUtil = require('../logger/log4Util')
import { formatTime } from '../utils/timer'
interface redisConfig {
  port: number
  host: string
  password: string
  db: number //连接的数据库id，默认为0，即第一个数据库
}

const clientCreate = (config: redisConfig, callback_: any) => {
  const redis = new Redis(config)
  redis.on('connect', () => {
    //根据 connect 事件判断连接成功
    callback_(null, redis) //链接成功， 返回 redis 连接对象
  })
  redis.on('error', (err: any) => {
    //根据 error 事件判断连接失败
    callback_(err, null) //捕捉异常， 返回 error
  })
}

const redisConn = (options: redisConfig) => {
  const config = options
  return new Promise((resolve, reject) => {
    //返回API调用方 一个 promise 对象
    clientCreate(config, (err: any, conn: any) => {
      if (err) {
        reject(err)
      }
      resolve(conn) //返回连接的redis对象
    })
  })
}

interface redisTool {
  setString(key: string, value: any, overTime: number): Promise<unknown>
  getString(key: any): Promise<unknown>
  delString(key: string): Promise<unknown>
  getDbSize(): Promise<unknown>
  connToRedis(): Promise<unknown>
}

class RedisTool implements redisTool {
  redis: any
  config: any
  constructor(opt: any) {
    this.redis = null
    if (opt) {
      this.config = Object.assign(RedisConfigGet, opt)
    } else {
      this.config = RedisConfigGet
    }
    this.connToRedis()
      .then((res) => {
        if (res) {
          logUtil.logSql('连接Redis成功', '', formatTime(new Date().getTime()))
        }
      })
      .catch((err) => {
        logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      })
  }

  /**连接redis */
  connToRedis() {
    return new Promise((resolve, reject) => {
      if (this.redis) {
        resolve(true) //已创建
      } else {
        redisConn(this.config)
          .then((resp: any) => {
            this.redis = resp
            resolve(true)
          })
          .catch((err: any) => {
            reject(err)
          })
      }
    })
  }

  /**存储string类型的key-value */
  async setString(key: string, value: any, overTime = -1) {
    const val: string = typeof value !== 'string' ? JSON.stringify(value) : value
    const k: string = typeof value !== 'string' ? JSON.stringify(key) : key
    try {
      const res = await this.redis.set(k, val, overTime)
      return {
        dataStatus: 1,
        errInfo: '',
        errMessage: '',
        successMessage: 'Redis设置值成功',
        result: res || val,
      }
    } catch (err) {
      logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      return {
        dataStatus: 0,
        errInfo: err,
        errMessage: 'Redis设置值失败',
        successMessage: '',
        result: '',
      }
    }
  }

  /**获取string类型的key-value */
  async getString(key: any) {
    const id: string = typeof key !== 'string' ? JSON.stringify(key) : key
    try {
      const res = await this.redis.get(id)
      return {
        dataStatus: 1,
        errInfo: '',
        errMessage: '',
        successMessage: 'Redis获取值成功',
        result: res,
      }
    } catch (err) {
      logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      return {
        dataStatus: 0,
        errInfo: err,
        errMessage: 'Redis获取值失败',
        successMessage: '',
        result: '',
      }
    }
  }

  /**删除string类型的key-value */
  async delString(key: string) {
    const id: string = typeof key !== 'string' ? JSON.stringify(key) : key
    try {
      const res = await this.redis.destroy(id)
      return {
        dataStatus: 1,
        errInfo: '',
        errMessage: '',
        successMessage: 'Redis删除值成功',
        result: res,
      }
    } catch (err) {
      logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      return {
        dataStatus: 0,
        errInfo: err,
        errMessage: 'Redis删除值失败',
        successMessage: '',
        result: '',
      }
    }
  }

  /**获取当前数据库key的数量 */
  async getDbSize() {
    try {
      const res = await this.redis.dbsize()
      return {
        dataStatus: 1,
        errInfo: '',
        errMessage: '',
        successMessage: 'Redis查询Size成功',
        result: res,
      }
    } catch (err) {
      logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
      return {
        dataStatus: 0,
        errInfo: err,
        errMessage: 'Redis查询Size失败',
        successMessage: '',
        result: '',
      }
    }
  }
}

const redisCommon = new RedisTool({ db: 0 })
const redisMessage = new RedisTool({ db: 1 })
const redisToken = new RedisTool({ db: 2 })
const redisSysData = new RedisTool({ db: 3 })
const redisBlacklist = new RedisTool({ db: 4 })
const redisOther = new RedisTool({ db: 8 })
module.exports = {
  redisCommon,
  redisMessage,
  redisToken,
  redisSysData,
  redisBlacklist,
  redisOther,
}
