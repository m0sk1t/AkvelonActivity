const router = require('express').Router();

router.use('/auth', require('./routes/auth').router);
router.use('/api/v1/teams', require('./routes/teams'));
router.use('/api/v1/users', require('./routes/users'));
router.use('/api/v1/activity', require('./routes/activity'));

module.exports = router;
