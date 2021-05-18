const mongoose = require('./db')
const jurisdictionSet = () => {
  const schema = new mongoose.Schema({
    id: { type: String, require: true, index: true, unique: true },
    info: { type: String, require: true },
  })
  return mongoose.model('jurisdiction', schema)
}
export const Jurisdiction = jurisdictionSet()
