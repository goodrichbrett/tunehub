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
	console.log('user\n' + req.user);
	User.findById(req.user._id)
		.then((userInfo) => {
			console.log(userInfo);
			Song.find({ ownedBy: userInfo._id }).then((songs) => {
				console.log(songs);
				res.render('users/profile', {
					user: req.user,
					userInfo,
					songs,
				});
			});
		})
		.catch((error) => {
			console.log(error);
		});
}
