const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
	trackName: String,
	albumName: String,
	artistName: String,
	explicit: String,
	artwork: String,
});

module.exports = mongoose.model('Song', songSchema);
