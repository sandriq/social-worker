const Router = require('express')
const controller = require('../controllers/organizationController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getOrganizations);
router.post('/', ticketValidator, controller.addOrganization);
router.patch('/', ticketValidator, controller.updateOrganization);
router.delete('/', ticketValidator, controller.deleteOrganization);
router.get('/organization_id', ticketValidator, controller.getOrganization);

module.exports = router