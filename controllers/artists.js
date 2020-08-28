const Artist = require('../models/artist');
const axios = require('axios');

module.exports = {
	index,
};

function index(req, res) {
	res.render('artists/index', {
		user: req.user,
	});
}
