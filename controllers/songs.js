const Song = require('../models/song');
const axios = require('axios');

module.exports = {
	index,
	search,
	newSong,
	show,
};

function index(req, res) {
	res.render('songs/index', {
		user: req.user,
	});
}

function search(req, res) {
	axios
		.get(
			`https://itunes.apple.com/search?term=${req.body.artistQuery}&entity=allTrack&attribute=allTrackTerm&limit=100`
		)
		.then((response) => {
			console.log(response.data.results);
			res.render('songs/new', {
				user: req.user ? req.user : null,
				results: response.data.results,
			});
		})
		.catch((error) => {
			console.log(error);
		});
}

function newSong(req, res) {
	res.render('songs/new', {
		results: null,
		user: req.user ? req.user : null,
	});
}

function show(req, res) {
	axios
		.get(`https://itunes.apple.com/search?term=${req.params.slug}`)
		.then((response) => {
			Song.findOne({ slug: response.data.slug })
				.populate('ownedBy')
				.then((song) => {
					if (song) {
						res.render('songs/show', {
							user: req.user,
							ownedBy: song.ownedBy,
							song: response.data,
							songId: song._id,
							reviews: song.reviews,
						});
					} else {
						res.render('songs/show', {
							user: req.user,
							song: response.data,
							ownedBy: [''],
							reviews: [''],
						});
					}
				});
		});
}
