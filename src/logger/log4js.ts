export {}
const path = require('path')

// 日志根目录
const baseLogPath = path.resolve(__dirname, '../../logs')

// 错误日志目录
const errorPath = '/error'
// 错误日志文件名
const errorFileName = 'error'
// 错误日志输出完整路径
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName

// 请求日志目录
const reqPath = '/request'
// 请求日志文件名
const reqFileName = 'request'
// 请求日志输出完整路径
const reqLogPath = baseLogPath + reqPath + '/' + reqFileName

// 响应日志目录
const responsePath = '/response'
// 响应日志文件名
const responseFileName = 'response'
// 响应日志输出完整路径
const responseLogPath = baseLogPath + responsePath + '/' + responseFileName

// 信息日志目录
const infoPath = '/info'
// 信息日志文件名
const infoFileName = 'info'
// 信息日志输出完整路径
const infoLogPath = baseLogPath + infoPath + '/' + infoFileName

// sql日志目录
const sqlPath = '/sql'
// 信息日志文件名
const sqlFileName = 'sql'
// 信息日志输出完整路径
const sqlLogPath = baseLogPath + sqlPath + '/' + sqlFileName

// 危险日志目录
const dangerPath = '/danger'
// 危险日志文件名
const dangerFileName = 'danger'
// 危险日志输出完整路径
const dangerLogPath = baseLogPath + dangerPath + '/' + dangerFileName

// 系统操作记录日志目录
const recordPath = '/record'
// 系统操作记录日志文件名
const recordFileName = 'record'
// 系统操作记录日志输出完整路径
const recordLogPath = baseLogPath + recordPath + '/' + recordFileName

// 警告日志目录
const warningPath = '/warning'
// 警告日志文件名
const warningFileName = 'warning'
// 警告日志输出完整路径
const warningLogPath = baseLogPath + warningPath + '/' + warningFileName

module.exports = {
  // 日志格式等设置
  appenders: {
    console: {
      type: 'console',
    },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      daysToKeep: 30,
      path: errorPath,
      layout: {
        type: 'basic',
      },
    },
    http: {
      type: 'dateFile',
      filename: reqLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: reqPath,
      daysToKeep: 30,
      layout: {
        type: 'basic', // 'messagePassThrough'
      },
    },
    resLogger: {
      type: 'dateFile',
      filename: responseLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: responsePath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
    infoLogger: {
      type: 'dateFile',
      filename: infoPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: infoLogPath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
    sqlLogger: {
      type: 'dateFile',
      filename: sqlLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: sqlPath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
    dangerLogger: {
      type: 'dateFile',
      filename: dangerLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: dangerPath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
    recordLogger: {
      type: 'dateFile',
      filename: recordLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: recordPath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
    warningLogger: {
      type: 'dateFile',
      filename: warningLogPath,
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 5000,
      numBackups: 5,
      path: warningPath,
      daysToKeep: 30,
      layout: {
        type: 'basic',
      },
    },
  },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: {
      appenders: ['console'],
      level: 'all',
    },
    resLogger: {
      appenders: ['resLogger', 'console'],
      level: 'info',
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error',
    },
    infoLogger: {
      appenders: ['infoLogger', 'console'],
      level: 'info',
    },
    sqlLogger: {
      appenders: ['sqlLogger', 'console'],
      level: 'info',
    },
    http: {
      appenders: ['http', 'console'],
      level: 'info',
    },
    dangerLogger: {
      appenders: ['dangerLogger', 'console'],
      level: 'info',
    },
    recordLogger: {
      appenders: ['recordLogger', 'console'],
      level: 'info',
    },
    warningLogger: {
      appenders: ['warningLogger', 'console'],
      level: 'info',
    },
  },
  baseLogPath,
  replaceConsole: true,
}
