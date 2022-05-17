const Router = require('express')
const controller = require('../controllers/taskController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.get('/', ticketValidator, controller.getTasks);
router.post('/', ticketValidator, controller.addTask);
router.patch('/', ticketValidator, controller.updateTask);
router.delete('/', ticketValidator, controller.deleteTask);
router.get('/task_id', ticketValidator, controller.getTask);

module.exports = router