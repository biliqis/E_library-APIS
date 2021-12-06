require("dotenv").config();
const { dbConnect } = require("./db");
const express = require("express");
const logger = require("loglevel")
const morgan = require("morgan")
const cron = require('node-cron')
const bodyParser = require('body-parser')
//const { engine } = require('express-handlebars');

const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(morgan("dev"))
//app.use(express.static("public"));

//app.engine('hbs', engine({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts"}));
//app.set("view engine", "hbs");
//app.set('views', './views');

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
  });	

app.use(routes);

const port = process.env.PORT || 8080;
async function bootstrap() {
	try {
		await dbConnect();

		app.listen(port, () => {
			console.log(`now listening for requests on port ${port}...`);
		});

	} catch (e) {
		logger.warn("an error occurred while starting the server")
		logger.error(e.message)
		process.exit(1);
	}

}

 bootstrap();