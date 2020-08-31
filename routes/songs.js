const router = require('express').Router();
const songsCtrl = require('../controllers/songs');

router.get('/', isLoggedIn, songsCtrl.index);
router.post('/search', songsCtrl.search);
router.get('/new', songsCtrl.newSong);
router.get('/:id', isLoggedIn, songsCtrl.show);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/auth/google');
}

module.exports = router;
