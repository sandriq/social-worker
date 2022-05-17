const httpResponse = require('../helpers/response');
const service = require('../services/ticketService');

exports.getTickets = async (req, res) => {
  try {
    const result = await service.getTickets(req.query);
    return httpResponse.ok(res, result);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.addTickets = async (req, res) => {
  try {
    const response = await service.addTickets(req.body);
    if (response?.status === 404 && response?.msg) {
      return httpResponse.notFound(res, response.msg);
    }
    if (response?.status === 400 && response?.msg) {
      return httpResponse.clientError(res, response.msg);
    }
    return httpResponse.ok(res, { result: 'Ticket added' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const result = await service.updateTicket(req.body);
    if (result?.status === 400 && result?.msg) {
      return httpResponse.clientError(res, result.msg);
    }
    if (result?.status === 404 && result?.msg) {
      return httpResponse.notFound(res, result.msg);
    }
    if (result?.status === 404) {
      return httpResponse.notFound(res, "This ticket doesn't exist");
    }
    return httpResponse.ok(res, { result: 'Ticket updated' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await service.deleteTicket(req.body);
    return httpResponse.ok(res, { result: 'Ticket deleted' });
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};

exports.getTicket = async (req, res) => {
  const { ticket_id } = req.query;
  try {
    if (!ticket_id) {
      throw Error('getTicket(), missed required param: ticket_id');
    }
    const response = await service.getTicket(ticket_id);
    return httpResponse.ok(res, response);
  } catch (e) {
    return httpResponse.fail(res, e.message);
  }
};
