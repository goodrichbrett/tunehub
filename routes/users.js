var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.get('/', usersCtrl.index);

module.exports = router;
