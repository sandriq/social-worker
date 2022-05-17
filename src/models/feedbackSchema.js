const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const FeedbackSchema = new Schema({
  value: { type: String, required: true },
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  is,
})

module.exports = model('Feedback', FeedbackSchema)