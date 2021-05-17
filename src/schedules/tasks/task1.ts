export {}
const schedule = require('node-schedule')
export const task1 = () => {
  const rule = new schedule.RecurrenceRule()
  rule.second = 1
  schedule.scheduleJob(rule, () => {
    rule.second = 50
    console.log('执行了定时任务1' + new Date())
  })
}
