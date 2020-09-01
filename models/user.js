const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		email: String,
		avatar: String,
		googleId: String,
		message: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
