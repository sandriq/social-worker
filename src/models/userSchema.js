const {Schema,model} = require('mongoose')
const {is} = require('./common/schemas')

const UserSchema = new Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  surname: { type: String },
  age: { type: Number },
  position: { type: String },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization'},
  admin: { type: Boolean },
  is,
})

module.exports = model('User', UserSchema)