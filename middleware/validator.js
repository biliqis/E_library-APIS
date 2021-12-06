// const User = require("../modules/user/userModel");
// const bcrypt = require('bcryptjs')
// let emailRegexVal = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

// module.exports.signUpValidator = async (req, res, next) => {
// 	try {
// 		const { firstName, lastName, email, password } = req.body;
// 		if (!password.length >= 8) {
// 			return res.status(400).send("password length must be at least eight characters");
// 		}

// 		if (!(firstName || lastName || email || password)) {
// 			return res.status(400).send("All inputs are required");
// 		}
// 		if (!emailRegexVal.test(email)) {
// 			return res.status(400).send("invalid email address");
// 		}


// 		const checkUser = await User.findOne({ email });
// 		if (checkUser) {
// 			return res.status(409).send("An account with this email already exists.");
// 		}
// 		next();
// 	} catch (err) {
// 		console.error(err)
// 		return res.status(500).send(err.message)
// 	}
// };


// module.exports.loginValidator = async (req, res, next) => {
// 	try {
// 		const { email, password } = req.body;
// 		const user = await User.findOne({
// 			email,
// 		});
// 		if (!emailRegexVal.test(email)) {
// 			return res.status(400).send("invalid email address");
// 		}
// 		if (!user) return res.status(404).json({ message: "account not found" });
// 		const validPassword = bcrypt.compare(password, user.password);
// 		if (!validPassword) {
// 			return res.status(400).json({ message: "Invalid email or password" });
// 		}
// 	} catch (err) {
// 		console.error(err)
// 		return res.status(500).send(err.message)

// 	}
// }


// module.exports.AdminloginValidator = async (req, res,next) => {
// 	try {
// 		const { email, password } = req.body;
// 		const admin = await User.findOne({
// 			email,
// 		});
// 		if (!admin) return res.status(404).json({ message: "account not found" });
// 		const validPassword = bcrypt.compare(password, admin.password);
// 		if (!validPassword) {
// 			return res.status(400).json({ message: "Invalid email or password" });
// 		}
// 		next();
// 	} catch (err) {
// 		console.error(err)
// 		return res.status(500).send(err.message)
// 	}


// }

