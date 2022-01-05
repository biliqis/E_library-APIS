const mongoose = require("mongoose");
const logger = require("loglevel");

module.exports.dbConnect = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		// await mongoose.connect(process.env.CONNECTION_STRING, connectionParams);
		await mongoose.connect(process.env.DB_URI)
		console.log("Connected to DB");
	} catch (error) {
		logger.warn("an error occurred while connecting to the database");
		logger.error(error.message);
		console.error(error.message);
	}
};