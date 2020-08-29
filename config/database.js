const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// database connection event
const db = mongoose.connection;
db.on('connected', function () {
	console.log(`Connected to MongoDb at${db.host}:${db.port}`);
});

module.exports = mongoose;
