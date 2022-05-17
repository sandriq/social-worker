const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const DocSchema = new Schema({
  location: { type: String, unique: true, default: '' },
  name: { type: String, required: true },
  is,
})

module.exports = model('Doc', DocSchema)