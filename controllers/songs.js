const Song = require('../models/song');
const axios = require('axios');

module.exports = {
	index,
	search,
	newSong,
	show,
	addToOwned,
};

function index(req, res) {
	Song.find({ ownedBy: req.user._id }).then((songs) => {
		res.render('songs/index', {
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
			// console.log(response.data.results);
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
	console.log(req.body);
	axios
		.get(`https://itunes.apple.com/search?term=${req.params.trackId}`)
		.then((response) => {
			console.log(response.data);
			Song.findOne({ trackId: response.data.trackId })
				.populate('ownedBy')
				.then((song) => {
					res.render('songs/show', {
						user: req.user,
						song: response.data,
						researchName: req.body.artistQuery,
						songId: response.data._id,
						ownedBy: song.ownedBy,
					});
				});
		})
		.catch((error) => {
			console.log(error);
		});
}

function addToOwned(req, res) {
	req.body.ownedBy = req.user._id;
	Song.findOne({ trackId: req.body.trackId }).then((err, song) => {
		if (song) {
			console.log(req.user._id);
			song.ownedBy.push(req.user._id);
			song.save().then((err) => {
				res.redirect(`/songs/${req.params.trackId}`);
			});
		} else {
			Song.create(req.body).then((err) => {
				res.redirect(`/songs/${req.params.trackId}`);
			});
		}
	});
}
