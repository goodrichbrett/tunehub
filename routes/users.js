var router = require('express').Router();
const songsCtrl = require('../controllers/songs');

// GET /users
router.get('/', songsCtrl.index);

module.exports = router;
