var router = require('express').Router();
var passport = require('passport');

// The root route renders our only view
router.get('/', function (req, res) {
	res.redirect('/users');
});

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
