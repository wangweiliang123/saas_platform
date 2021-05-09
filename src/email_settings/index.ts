export {}
import { formatTime } from '../utils/timer'
const logUtil = require('../logger/log4Util')
import { systemSendEmail, systemSendEmailType, systemEmailKey } from '../configs/system.config'
const nodemailer = require('nodemailer') //引入模块
const sendEmails = async (
  toList: Array<string>,
  content: string,
  subject = '系统邮件',
  attachments = [],
  htmlContent = '',
) => {
  return new Promise((resolve, reject) => {
    let settings = {}
    switch (String(systemSendEmailType)) {
      case 'qq':
        settings = {
          service: 'qq', //类型qq邮箱
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: systemSendEmail, // 发送方的邮箱
            pass: systemEmailKey, // smtp 的授权码
          },
        }
        break
      case '163':
        settings = {
          host: 'smtp.163.com',
          port: 465,
          secure: true, // 如果是 true 则port填写465, 如果 false 则可以填写其它端口号
          auth: {
            user: systemSendEmail, // 发件人邮箱
            pass: systemEmailKey, // 发件人密码(用自己的...)
          },
        }
    }
    const transporter = nodemailer.createTransport(settings)
    const mailOptions = {
      from: systemSendEmail,
      to: toList.join(','),
      subject: subject,
      text: content,
      html: htmlContent,
      attachments: attachments,
    }
    //发送函数
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        logUtil.logInfo(`发送邮件失败：邮件详情${JSON.stringify(mailOptions)}`, '', formatTime(new Date().getTime()))
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
  })
}
module.exports = sendEmails
