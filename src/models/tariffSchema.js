const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const TariffSchema = new Schema({
  price: {type: Number, required: true},
  is,
})

module.exports = model('Tariff', TariffSchema)