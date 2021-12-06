const mongoose = require("mongoose");
const logger = require("loglevel");

module.exports.dbConnect = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		// await mongoose.connect(process.env.MONGO_URI, connectionParams);
		await mongoose.connect(process.env.DB_URI, connectionParams)
		console.log("Connected to DB");
	} catch (error) {
		logger.warn("an error occurred while connecting to the database")
		logger.error(error.message)
		console.error(error.message);
	}
};



// const mongodb = require('mongodb');
// const connectMongodb = require('../db');
// let DATABASE_CONNECTION = null;
// function setDb() {
//   return (
//     // If we have a database connection
//     // Return it
//     // Else
//     // Regenerate it
//     DATABASE_CONNECTION ||
//     connectMongodb().then((client) => {
//       DATABASE_CONNECTION = client.db('econnect');
//     })
//   );
// }

