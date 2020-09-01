const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		rating: String,
		content: String,
		user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
);

const songSchema = new Schema(
	{
		trackName: String,
		albumName: String,
		artistName: String,
		explicit: String,
		artwork: String,
		ownedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		trackId: Number,
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Song', songSchema);
