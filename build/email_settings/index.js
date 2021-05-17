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
var timer_1 = require('../utils/timer')
var logUtil = require('../logger/log4Util')
var system_config_1 = require('../configs/system.config')
var nodemailer = require('nodemailer') //引入模块
var sendEmails = function (toList, content, subject, attachments, htmlContent) {
  if (subject === void 0) {
    subject = '系统邮件'
  }
  if (attachments === void 0) {
    attachments = []
  }
  if (htmlContent === void 0) {
    htmlContent = ''
  }
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        new Promise(function (resolve, reject) {
          var settings = {}
          switch (String(system_config_1.systemSendEmailType)) {
            case 'qq':
              settings = {
                service: 'qq',
                port: 465,
                secure: true,
                auth: {
                  user: system_config_1.systemSendEmail,
                  pass: system_config_1.systemEmailKey, // smtp 的授权码
                },
              }
              break
            case '163':
              settings = {
                host: 'smtp.163.com',
                port: 465,
                secure: true,
                auth: {
                  user: system_config_1.systemSendEmail,
                  pass: system_config_1.systemEmailKey, // 发件人密码(用自己的...)
                },
              }
          }
          var transporter = nodemailer.createTransport(settings)
          var mailOptions = {
            from: system_config_1.systemSendEmail,
            to: toList.join(','),
            subject: subject,
            text: content,
            html: htmlContent,
            attachments: attachments,
          }
          //发送函数
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              logUtil.logInfo(
                '\u53D1\u9001\u90AE\u4EF6\u5931\u8D25\uFF1A\u90AE\u4EF6\u8BE6\u60C5' + JSON.stringify(mailOptions),
                '',
                timer_1.formatTime(new Date().getTime()),
              )
              reject({
                dataStatus: 0,
                errInfo: err,
                errMessage: '发送邮件失败',
                successMessage: '',
                result: '',
              })
            } else {
              resolve({
                dataStatus: 1,
                errInfo: '',
                errMessage: '',
                successMessage: '发送邮件成功',
                result: info,
              })
            }
          })
        }),
      ]
    })
  })
}
module.exports = sendEmails
