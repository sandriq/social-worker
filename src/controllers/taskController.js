const httpResponse = require('../helpers/response');
const service = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const result = await service.getTasks(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addTask = async (req, res) => {
  try {
    const response = await service.addTask(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Task added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const result = await service.updateTask(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This task doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Task updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await service.deleteTask(req.body);
    return httpResponse.ok(res, { result: 'Task deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getTask = async (req, res) => {
  const { task_id } = req.query;
  try {
    if (!task_id) {
      throw Error('getTask(), missed required param: task_id');
    }
    const response = await service.getTask(task_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
