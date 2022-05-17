const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hackathon', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
mongoose.set('useCreateIndex', true);

const Users = require('./userSchema')
const Token = require('./tokenSchema')
const Customers = require('./customerSchema')
const Doc = require('./docSchema')
const Tariff = require('./tariffSchema')
const Feedbacks = require('./feedbackSchema')
const Tasks = require('./taskSchema')
const Tickets = require('./ticketSchema')
const Organization = require('./organizationSchema')

module.exports = { Users, Token, Customers, Feedbacks, Tasks, Tickets, Organization, Doc, Tariff, db }