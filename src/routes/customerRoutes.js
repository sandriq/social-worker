const Router = require('express')
const controller = require('../controllers/customerController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getCustomers);
router.post('/', ticketValidator, controller.addCustomer);
router.patch('/', ticketValidator, controller.updateCustomer);
router.delete('/', ticketValidator, controller.deleteCustomer);
router.get('/customer_id', ticketValidator, controller.getCustomer);

module.exports = router