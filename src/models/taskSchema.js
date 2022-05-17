const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const TaskSchema = new Schema({
  desc: { type: String, required: true },
  type: { type: String, required: true},
  tariff: { type: Schema.Types.ObjectId, ref: 'Tariff', required: true},
  color: { type: String },
  backgroundColor: { type: String },
  is,
})

module.exports = model('Task', TaskSchema)