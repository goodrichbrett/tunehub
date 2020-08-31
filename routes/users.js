const router = require('express').Router();
const usersCtrl = require('../controllers/users');

// GET /users
router.get('/', isLoggedIn, usersCtrl.index);
router.get('/users/profile', isLoggedIn, usersCtrl.showProfile);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/auth/google');
}

module.exports = router;
