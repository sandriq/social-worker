const Router = require('express')
const controller = require('../controllers/feedbackController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getFeedbacks);
router.post('/', ticketValidator, controller.addFeedback);
router.patch('/', ticketValidator, controller.updateFeedback);
router.delete('/', ticketValidator, controller.deleteFeedback);
router.get('/feedback_id', ticketValidator, controller.getFeedback);

module.exports = router