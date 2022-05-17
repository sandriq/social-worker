const Router = require('express')
const controller = require('../controllers/docController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getDocs);
router.post('/', ticketValidator, controller.addDoc);
router.patch('/', ticketValidator, controller.updateDoc);
router.delete('/', ticketValidator, controller.deleteDoc);
router.get('/doc_id', ticketValidator, controller.getDoc);

module.exports = router