const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

//Получатель услуг
const CustomerSchema = new Schema({
  birthday: { type: Date },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  doc: { type: Schema.Types.ObjectId, ref: 'Doc', required: true },
  address: { type: String, required: true },
  photo: { type: String, unique: true, default: '' },
  extraInfo: { type: String },
  phone: { type: String },
  plan: { type: Boolean, default: false }, // plan = false - бесплатный тариф, plan = true - платный
  is,
})

module.exports = model('Customer', CustomerSchema)