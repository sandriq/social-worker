const { Schema } = require('mongoose');
let Mixed = Schema.Types.Mixed;
let ObjectId = Schema.Types.ObjectId;

module.exports.is = new Schema({

  enabled: { type: Boolean, default: true, required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },

}, { _id: false });

module.exports.locales = new Schema({

  value: { type: String, },
  firstname: { type: String, },
  lastname: { type: String, },
  middlename : { type: String},
  job: { type: String, },
  minitext: { type: String, },
  smalltext: { type: String, },
  comment: { type: String, },

}, { _id: false });