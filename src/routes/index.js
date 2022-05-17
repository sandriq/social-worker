const router = require('express').Router({ mergeParams: true });

router.use('/ticket', require('./ticketRoutes'))
router.use('/user', require('./userRoutes'));
router.use('/customer', require('./customerRoutes'))
router.use('/feedback', require('./feedbackRoutes'))
router.use('/organizaton', require('./organizationRoutes'))
router.use('/tariff', require('./tariffRoutes'))
router.use('/task', require('./taskRoutes'))


module.exports = router;