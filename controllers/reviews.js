const Song = require('../models/song');

module.exports = {
	create,
};

function create(req, res) {
	Song.findById(req.params.trackId).then((song) => {
		console.log(song);
		song.reviews.push(req.body);
		song.save().then(() => {
			res.redirect(`/songs/${song.trackId}`);
		});
	});
}

function create(req, res) {
	Song.findOne({ trackId: req.body.trackId }).then((song) => {
		console.log(req.body);
		song.reviews.push(req.body);
		song.save()
			.then(() => {
				res.redirect(`/songs/${song.trackId}`);
			})
			.catch((error) => {
				console.log(error);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}
