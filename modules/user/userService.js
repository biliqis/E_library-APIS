const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXP;
const bcrypt = require("bcryptjs");


const UserModel = require("./userModel");

const UserService = {};
UserService.generateJwt = (userObj) => {
	return jwt.sign(userObj, jwtSecretKey, {
		expiresIn: process.env.JWT_EXP,
	});
};

UserService.comparePassword = async (password, password2) => {
	return bcrypt.compare(password, password2);
};

UserService.countDocuments = (user) => {
	return UserModel.countDocuments(user).then((count) => count > 0);
};


//helper function to find a single user before logging in
UserService.findSingle = (email) => {
	return UserModel.findOne({ email: email })
}

//helper function to check if an account already exists
UserService.findSingleById = async (id) => {
	return await UserModel.findById(id)
}

UserService.updateUser = async (req, res) => {
	return await UserModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
}

UserService.deleteUser = async (req, res) => {
	const id = req.params.id;
	let user =  await UserModel.findById(id)
	let deleteUser = await UserModel.deleteOne({_id:id})
	return {user,deleteUser}	
};


UserService.userSignUp = async (req, res) => {
	// if (!req.body.password === req.body.confirmPassword) {
	// 	// return res.status(401).send({message:"fields do not match"})
	// 	throw new Error("fields do not match",401)
	// }
	console.log("password")
	console.log(req.body)
	const user = await UserModel.create(req.body);
	const token = UserService.generateJwt({ user_id: user._id, roles: req.body.role });
	return { user, token };

};


UserService.userLogin = async (req, res) => {
	const user = await UserModel.findOne({ email: req.body.email, })
	const token = UserService.generateJwt({ user_id: user._id, roles: req.body.roles });
	
	return { user, token }
};





module.exports.UserService = UserService;
