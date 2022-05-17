const { models } = require('mongoose');
const moment = require('moment');

const getTickets = async ({date, type}) => {
  let tickets;
  if (date) {
    let start = new Date(date);
    let end = new Date(date);
    start.setUTCHours(0,0,0,0);
    end.setUTCHours(24,59,59,999);
    switch(type) {
      case 'day':
        break;
      case 'week':
        start = moment(start).startOf('week').toDate()
        end = moment(end).endOf('week').toDate()
        break;
      case 'month':
        start = moment(start).startOf('month').toDate()
        end = moment(end).endOf('month').toDate()
        break;
    }
    tickets = await models.Ticket.find({$and: [{ date:{ $gte: start }}, {date: { $lte: end}}]});
  }
    else {
    tickets = await models.Ticket.find();
  }
  return Promise.all(tickets.map(async (ticket) => {
    if (ticket.customer) {
      ticket.customer = await models.Customer.findById(ticket.customer)
    }
    if (ticket.user) {
      ticket.user = await models.User.findById(ticket.user)
    }
    if (ticket.feedback) {
      ticket.feedback = await models.Feedback.findById(ticket.feedback);
    }
    if (Array.isArray(ticket.tasks) && ticket.tasks.length > 0) {
      const tasks = ticket.tasks;
      ticket.tasks = await Promise.all(tasks.map(async (taskObj) => {
        taskObj.data = await models.Task.findById(taskObj.id);
        taskObj.data.done = taskObj.done;
        taskObj.data = Object.assign(taskObj, taskObj.data);
        return taskObj;
      }));

    }
    return ticket
  }))
}

const addTickets = async (body) => {
  const {
    date,
    status,
    customer,
    user,
    tasks,
    feedback,
    comment,
  } = body

  return models.Ticket.create({
    date,
    status,
    customer,
    user,
    tasks,
    feedback,
    comment,
    is: {
      enabled: true
    }
  })
}

const updateTicket = async (body) => {
  if (!body?.id) {
    throw new Error(`Тикет не найден`)
  }
  return models.Ticket.findByIdAndUpdate(body.id, body)
}

const deleteTicket = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no delete id`)
  }
  return await models.Ticket.findByIdAndDelete(id);
}

const getTicket = async (id) => {
  const ticket = await models.Ticket.findById(id);
  if (ticket.customer) {
    ticket.customer = await models.Customer.findById(ticket.customer)
  }
  if (ticket.user) {
    ticket.user = await models.User.findById(ticket.user)
  }
  if (ticket.feedback) {
    ticket.feedback = await models.Feedback.findById(ticket.feedback);
  }
  if (Array.isArray(ticket.tasks) && ticket.tasks.length > 0) {
    const tasks = ticket.tasks;
    ticket.tasks = await Promise.all(tasks.map(async (taskObj) => {
      taskObj.data = await models.Task.findById(taskObj.id);
      taskObj.data.done = taskObj.done;
      taskObj.data = Object.assign(taskObj, taskObj.data);
      return taskObj;
    }));
  }
  return ticket
}


module.exports = {
  getTickets,
  addTickets,
  updateTicket,
  deleteTicket,
  getTicket
};