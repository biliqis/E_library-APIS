const { validationResult } = require("express-validator");
const userModel = require("./userModel");
const { UserService } = require("./userService");

const userGuard = {};

userGuard.userSignUpGuard = async (req) => {
	// database checks
	const result = await UserService.countDocuments({
		$or: [
			{
				email: req.body.email,
			},
			{
				phonenumber: req.body.phonenumber,
			},
		],
	});
	if (result) {
		throw new Error("Email or Phone number already exist");
	}
	console.log(result)

};

userGuard.UserValidator = (req, res) => {
	const result = validationResult(req);

	const hasErrors = !result.isEmpty();

	if (hasErrors) {
		return {
			error: true,
			statusCode: 422,
			message: "Invalid body request",
			errors: result.array({ onlyFirstError: true }),
		}
	}
};


userGuard.userEmailExists = async (req) => {
	try {
		const result = await UserService.findSingle(
			req.body.email
		)
		if (result) {
			throw new Error("Email already exist!");
		}
	} catch (err) {
		console.error(err)
		throw new Error(err.message)
	}

}

userGuard.userIdExists = async (req) => {
	const result = await userModel.findById(req.params.id)
	if (!result) {
		throw new Error("User with id not found!");
	}
}
userGuard.userloginGuard = async (req) => {
	const { email, password } = req.body;
	const user = await UserService.findSingle(email);
	if (!user) {
		throw new Error("user does not exist!");
	}
	let verify = await UserService.comparePassword(password, user.password);
	if (!verify) {
		throw new Error("Invaild email or password");
	}
	req.user = user;
}
userGuard.updateUser = async (req) => {
	const { id } = req.params;
	try {
		const checkUser = await UserService.findSingleById(id)
		if (!checkUser) {
			throw new Error("User with id not found");
		}
	} catch (e) {
		throw new Error(e.message);
	}
}
userGuard.deleteUsers = async (req) => {
	const id = req.params.id;
	const checkUser = await UserService.findSingleById(id)
	if (!checkUser) {
		throw new Error("User with id not found");
	}
};
module.exports = { userGuard }
