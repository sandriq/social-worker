const { models } = require('mongoose');

const getTasks = async () => {
  const tasks = await models.Task.find();
  return Promise.all(tasks.map(async (task) => {
    if (task.tariff) {
      task.tariff = await models.Tariff.findById(task.tariff);
    }
    return task
  }))
}

const addTask = async (body) => {
  const {
    desc,
    type,
    tariff,
    color,
    backgroundColor,
  } = body
  return models.Task.create({
    desc,
    type,
    tariff,
    color,
    backgroundColor,
    is: {
      enabled: true
    }
  })
}

const updateTask = async (body) => {
  if (!body?.id) {
    throw new Error(`Задача не найдена`)
  }
  return models.Task.findByIdAndUpdate(body.id, body)
}

const deleteTask = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no feedback id`)
  }
  return await models.Task.findByIdAndDelete(id);
}

const getTask = async (id) => {
  const task = await models.Task.findById(id);
  if (task.tariff) {
    task.tariff = await models.Tariff.findById(task.tariff);
  }
  return task
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTask,
};