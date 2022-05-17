const config = require('../config');
const { models } = require('mongoose');

const isValidTicket = async (cookies, accessToken) => {
  if (cookies.accessToken) {
    try {
      const res = await models.Token.findOne({ accessToken: cookies.accessToken });
      if (res) return true;
    } catch (e) {
      throw new Error(`${JSON.stringify(e)}`);
    }
  }
  else if (accessToken) {
    try {
      const res = await models.Token.findOne({ accessToken });
      if (res) return true;
    } catch (e) {
      throw new Error(`${JSON.stringify(e)}`);
    }
  }
};
module.exports = {
  isValidTicket,
};
