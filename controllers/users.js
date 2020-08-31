const User = require('../models/user');
const Song = require('../models/song');

module.exports = {
	index,
	showProfile,
};

function index(req, res) {
	User.find({}).then((users) => {
		res.render('users/index', { user: req.user, users });
	});
}

function showProfile(req, res) {
	console.log(req.user);
	User.findById(req.params.id)
		.then((userInfo) => {
			res.render('users/profile', {
				user: req.user,
				userInfo,
			});
		})
		.catch((error) => {
			console.log(error);
		});
}
