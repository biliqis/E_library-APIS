const { validationResult } = require("express-validator");
const userModel = require("./userModel");
const { UserService } = require("./userService");

const userGuard = {};

userGuard.userSignUpGuard = async (req) => {
	const result = await userModel.find({
		$or: [
			{
				email: req.body.email,
			},
			{
				username: req.body.username,
			},
		],
	});

	if (result.length) {
		throw new Error("Email or username already exist");
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
userGuard.userloginGuard = async (req, res, next) => {
	try {
		const verify = await UserService.propExists({
			$or: [
				{
					email: req.body.username
				},
				{
					username: req.body.username
				}
			]
		})
		console.log(verify)
		if (!verify) 
		throw new Error("Incorrect username or email", 401);
		next()
	} catch (error) {
		console.error(error)
		// return res.status(500).json({message:error.message})
	}
	
};




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
