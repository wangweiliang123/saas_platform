export {}
const RedisConfigGet = require('../configs/redis.config')
const Redis = require('koa-redis')
const logUtil = require('../logger/log4Util')
import { formatTime } from '../utils/timer'
import { redisList } from '../configs/system.config'
const redisTool = (opt: string) => {
  let db = {
    db: 16,
  }
  if (opt && redisList[opt]) {
    db = redisList[opt]
  }
  const config = Object.assign(RedisConfigGet, db)
  const redisClient = new Redis(config)
  redisClient.on('connect', () => {
    //根据 connect 事件判断连接成功
    logUtil.logSql('连接Redis成功', '', formatTime(new Date().getTime()))
  })
  redisClient.on('error', (err: any) => {
    //根据 error 事件判断连接失败
    logUtil.logSql(JSON.stringify(err), '', formatTime(new Date().getTime()))
    logUtil.logError('', err, '', formatTime(new Date().getTime()))
  })
  return redisClient
}
/**存储string类型的key-value */
const setString = async (key: any, value: any, overTime: any) => {
  const k: any = typeof key !== 'string' ? JSON.stringify(key) : key
  const val: any = typeof value !== 'string' ? JSON.stringify(value) : value
  const t: any = typeof overTime !== 'number' ? (parseInt(overTime) > 0 ? parseInt(overTime) : -1) : overTime
  try {
    const res = await redisTool().set(k, val, t * 1000)
    return {
      dataStatus: 1,
      errInfo: '',
      errMessage: '',
      successMessage: 'Redis设置值成功',
      result: res,
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
const getString = async (key: any) => {
  const id: string = typeof key !== 'string' ? JSON.stringify(key) : key
  try {
    const res = await redisTool().get(id)
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
const delString = async (key: string) => {
  const id: string = typeof key !== 'string' ? JSON.stringify(key) : key
  try {
    const res = await redisTool().destroy(id)
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
const obj = {}
module.exports = redisTool
