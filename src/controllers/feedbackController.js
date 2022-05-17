const httpResponse = require('../helpers/response');
const service = require('../services/feedbackService');

exports.getFeedbacks = async (req, res) => {
  try {
    const result = await service.getFeedbacks(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const response = await service.addFeedback(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Feedback added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const result = await service.updateFeedback(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This feedback doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Feedback updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await service.deleteFeedback(req.body);
    return httpResponse.ok(res, { result: 'Feedback deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getFeedback = async (req, res) => {
  const { feedback_id } = req.query;
  try {
    if (!feedback_id) {
      throw Error('getFeedback(), missed required param: feedback_id');
    }

    const response = await service.getFeedback(feedback_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
