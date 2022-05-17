const { models } = require('mongoose');

const getFeedbacks = async () => {
  const feedbacks = await models.Feedback.find();
  return await Promise.all(feedbacks.map(async (feedback) => {
    if (feedback.user) {
      feedback.user = await models.User.findById(feedback.user);
    }
    if (feedback.ticket) {
      feedback.ticket = await models.Ticket.findById(feedback.ticket);
    }
    return feedback
  }))
}

const addFeedback = async (body) => {
  const {
    value,
    ticket,
    user,
  } = body
  return models.Feedback.create({
    value,
    ticket,
    user,
    is: {
      enabled: true
    }
  })
}

const updateFeedback = async (body) => {
  if (!body?.id) {
    throw new Error(`Отзыв не найден`)
  }
  return models.Feedback.findByIdAndUpdate(body.id, body)
}

const deleteFeedback = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no feedback id`)
  }
  return await models.Feedback.findByIdAndDelete(id);
}

const getFeedback = async (id) => {
  const feedback = await models.Feedback.findById(id);
  if (feedback.user) {
    feedback.user = await models.User.findById(feedback.user);
  }
  if (feedback.ticket) {
    feedback.ticket = await models.Ticket.findById(feedback.ticket);
  }
  return feedback
}

module.exports = {
  getFeedbacks,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback
};