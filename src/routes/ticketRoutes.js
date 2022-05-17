const Router = require('express')
const controller = require('../controllers/ticketController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getTickets);
router.post('/', ticketValidator, controller.addTickets);
router.patch('/', ticketValidator, controller.updateTicket);
router.delete('/', ticketValidator, controller.deleteTicket);
router.get('/ticket_id', ticketValidator, controller.getTicket);

module.exports = router