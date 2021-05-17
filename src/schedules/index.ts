export {}
import { schedule } from '../configs/system.config'
import { task1 } from './tasks/task1'
const scheduleList = () => {
  if (!schedule) {
    return
  }
  task1()
}
module.exports = scheduleList
