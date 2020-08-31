const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
	{
		trackName: String,
		albumName: String,
		artistName: String,
		explicit: String,
		artwork: String,
		ownedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		trackId: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Song', songSchema);
