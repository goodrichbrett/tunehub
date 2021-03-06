const Song = require('../models/song');
const axios = require('axios');

module.exports = {
	index,
	search,
	newSong,
	show,
	addToOwned,
	removeFromList,
};

function index(req, res) {
	Song.find({ ownedBy: req.user._id }).then((songs) => {
		res.render('users/index', {
			user: req.user,
			songs,
		});
	});
}

function search(req, res) {
	axios
		.get(
			`https://itunes.apple.com/search?term=${req.body.artistQuery}&entity=allTrack&attribute=allTrackTerm&limit=100`
		)
		.then((response) => {
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
	// console.log(req.body);
	axios
		.get(`https://itunes.apple.com/search?term=${req.params.trackId}`)
		.then((response) => {
			Song.findOne({ trackId: req.params.trackId })
				.populate('ownedBy')
				.populate('reviews')
				.then((song) => {
					console.log(response.data);
					if (song) {
						res.render('songs/show', {
							user: req.user,
							song: response.data,
							researchName: req.body.artistQuery,
							trackId: response.data._id,
							ownedBy: song.ownedBy,
							reviews: song.reviews,
						});
					} else {
						res.render('songs/show', {
							user: req.user,
							song: response.data,
							researchName: req.body.artistQuery,
							songId: response.data._id,
							trackId: response.data.trackId,
							ownedBy: [''],
							reviews: [''],
						});
					}
				});
		})
		.catch((error) => {
			console.log(error);
		});
}

function addToOwned(req, res) {
	console.log(req.body);
	Song.findOne({ trackId: req.params.trackId })
		.then((song) => {
			console.log(song);
			if (song) {
				song.ownedBy.push(req.user._id);
				song.save()
					.then(() => {
						res.redirect(`/users/${req.user._id}/profile`);
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				req.body.ownedBy = [req.user._id];
				console.log(req.body);
				Song.create(req.body)
					.then(() => {
						res.redirect(`/users/${req.user._id}/profile`);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		})
		.catch((error) => console.log(error));
}

function removeFromList(req, res) {
	Song.findOne({ trackId: req.params.trackId }).then((song) => {
		let i = song.ownedBy.indexOf(req.user._id);
		song.ownedBy.splice(i, 1);
		song.save().then(() => {
			res.redirect(`/users/${req.user._id}/profile`);
		});
	});
}
