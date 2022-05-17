const httpResponse = require('../helpers/response');
const service = require('../services/customerService');

exports.getCustomers = async (req, res) => {
  try {
    const result = await service.getCustomers(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const response = await service.addCustomer(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Customer added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const result = await service.updateCustomer(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This customer doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Customer updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await service.deleteCustomer(req.body);
    return httpResponse.ok(res, { result: 'Customer deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getCustomer = async (req, res) => {
  const { customer_id } = req.query;
  try {
    if (!customer_id) {
      throw Error('getCustomer(), missed required param: customer_id');
    }

    const response = await service.getCustomer(customer_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
