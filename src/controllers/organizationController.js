const httpResponse = require('../helpers/response');
const service = require('../services/organizationService');

exports.getOrganizations = async (req, res) => {
  try {
    const result = await service.getOrganizations(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addOrganization = async (req, res) => {
  try {
    const response = await service.addOrganization(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Organization added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const result = await service.updateOrganization(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This feedback doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Organization updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    await service.deleteOrganization(req.body);
    return httpResponse.ok(res, { result: 'Organization deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getOrganization = async (req, res) => {
  const { organization_id } = req.query;
  try {
    if (!organization_id) {
      throw Error('getOrganization(), missed required param: organization_id');
    }
    const response = await service.getOrganization(organization_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
