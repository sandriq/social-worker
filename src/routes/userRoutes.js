const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const ticketValidator = require('../middlewares/ticketValidator');

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.post('/logout', ticketValidator, userController.logout)
router.get('/', ticketValidator, userController.getUsers);
router.post('/', ticketValidator, userController.addUser);
router.patch('/', ticketValidator, userController.updateUser);
router.delete('/', ticketValidator, userController.deleteUser);
router.get('/token', ticketValidator, userController.getUserByToken);
router.get('/user_id', ticketValidator, userController.getUser);

module.exports = router