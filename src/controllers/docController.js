const httpResponse = require('../helpers/response');
const service = require('../services/docService');

exports.getDocs = async (req, res) => {
  try {
    const result = await service.getDocs(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addDoc = async (req, res) => {
  try {
    const response = await service.addDoc(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Doc added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateDoc = async (req, res) => {
  try {
    const result = await service.updateDoc(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This doc doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Doc updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteDoc = async (req, res) => {
  try {
    await service.deleteDoc(req.body);
    return httpResponse.ok(res, { result: 'Doc deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getDoc = async (req, res) => {
  const { doc_id } = req.query;
  try {
    if (!doc_id) {
      throw Error('getDoc(), missed required param: doc_id');
    }
    const response = await service.getDoc(doc_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};