const router = require('express').Router();
const artistsCtrl = require('../controllers/artists');

router.get('/', artistsCtrl.index);

module.exports = router;
