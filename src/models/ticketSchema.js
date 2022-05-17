const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

tasksSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'Tasks'},
  done: { type: Boolean, default: false },
})

const TicketSchema = new Schema({
  date: { type: Date, required: true },
  status: { type: String, required: true, default: "created"},
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  tasks: [tasksSchema],
  feedback: { type: Schema.Types.ObjectId, ref: 'Feedback'},
  comment: { type: String },
  is,
})

module.exports = model('Ticket', TicketSchema)