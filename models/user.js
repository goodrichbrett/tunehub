const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		stars: String,
		content: String,
	},
	{
		timestamps: true,
	}
);

const userSchema = new Schema(
	{
		name: String,
		email: String,
		avatar: String,
		googleId: String,
		reviews: [reviewSchema],
		message: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
