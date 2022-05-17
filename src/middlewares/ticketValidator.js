const auth = require('../controllers/authController');

module.exports = async (req, res, next) => {
  try {
    const isValid = await auth.isValidTicket(req.cookies, req.headers.token);
    if (!isValid) res.status(401).send(`You don't have the appropriate role`);
    else next();
  } catch (err) {
    res.status(404).send(`Error:${err}, Unknown ticket`);
  }
};