var router = require('express').Router();
var usersCtrl = require('../controllers/users');
const artistsCtrl = require('../controllers/artists');

// GET /users
router.get('/', artistsCtrl.index);

module.exports = router;
