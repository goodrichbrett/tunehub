const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		rating: Number,
		content: String,
		user: String,
	},
	{
		timestamps: true,
	}
);

const songSchema = new Schema(
	{
		trackName: String,
		collectionName: String,
		artistName: String,
		trackExplicitness: String,
		artwork: String,
		ownedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		trackId: Number,
		videoUrl: String,
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Song', songSchema);
