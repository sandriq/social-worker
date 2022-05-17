const httpResponse = require('../helpers/response');
const service = require('../services/tariffService');

exports.getTariffs = async (req, res) => {
  try {
    const result = await service.getTariffs(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addTariff = async (req, res) => {
  try {
    const response = await service.addTariff(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Tariff added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateTariff = async (req, res) => {
  try {
    const result = await service.updateTariff(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This tariff doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Tariff updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteTariff = async (req, res) => {
  try {
    await service.deleteTariff(req.body);
    return httpResponse.ok(res, { result: 'Tariff deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getTariff = async (req, res) => {
  const { tariff_id } = req.query;
  try {
    if (!tariff_id) {
      throw Error('getTariff(), missed required param: tariff_id');
    }
    const response = await service.getTariff(tariff_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
