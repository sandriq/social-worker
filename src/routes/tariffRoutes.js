const Router = require('express')
const controller = require('../controllers/tariffController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getTariffs);
router.post('/', ticketValidator, controller.addTariff);
router.patch('/', ticketValidator, controller.updateTariff);
router.delete('/', ticketValidator, controller.deleteTariff);
router.get('/tariff_id', ticketValidator, controller.getTariff);

module.exports = router