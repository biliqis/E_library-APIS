const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	username: {
		type: String,
	},
	email: {
		type: String,
	},

	password: {
		type: String,
	},

	confirmPassword:{
		type:String,
	},

	phonenumber: {
		type: String,
	},

	occupation: {
		type: String,
	},

	gender: {
		type: String,
		enum: ["male", "female"]
	},

	role: {
		type: String,
		enum: ["admin", "user"]
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 3600,// this is the expiry time in seconds
	  },



	address: {
		type: String,
	}
	
},{timestamps:true});
userSchema.index({ '$**': 'text' })

//fire a mongoose hook to hash passwords before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	console.log("password" + this.password)
	console.log("salt" + salt)
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model("Users", userSchema);


