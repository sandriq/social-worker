const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const OrganizationSchema = new Schema({
  name: { type: String },
  is,
})

module.exports = model('Organization', OrganizationSchema)