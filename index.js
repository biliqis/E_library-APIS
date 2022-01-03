require("dotenv").config();
const { dbConnect } = require("./db");
const express = require("express");
const logger = require("loglevel");
const morgan = require("morgan");
const cron = require('node-cron');
const cors = require("cors");
const bodyParser = require('body-parser');

const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.use(routes);

const port = process.env.PORT || 8080;
async function bootstrap() {
	try {
		await dbConnect();

		app.listen(port, () => {
			console.log(`now listening for requests on port ${port}...`);
		});

	} catch (e) {
		logger.warn("an error occurred while starting the server");
		logger.error(e.message);
		process.exit(1);
	}

}

 bootstrap();