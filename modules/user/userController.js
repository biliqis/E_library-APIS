const User = require("./userModel");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const { UserService } = require("./userService");
const { Error } = require("mongoose");
const userModel = require("./userModel");

const UserController = {};


UserController.userSignUp = async (req, res,next) => {
	try {
		const { user, token } = await UserService.userSignUp(req, res);
		const result = { message: "user created successfully!", user, token };
		return res.status(200).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message })
	}
}

//GET SINGLE USER
UserController.getSingleUser = async (req, res) => {
	try{
		return res.json({user: req.user});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message })	
	}
};

UserController.getAllBorrowedBooks


//USERLOGIN LOGIC
UserController.userLogin = async (req, res) => {
	try {
		// const { email, password } = req.body
		const { user, token } = await UserService.userLogin(req, res);
		const result = { message: "login sucessful!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err)
		return res.status(500).json(err.message)
	}
};
//UPDATE USER LOGIC
UserController.updateUser = async (req, res) => {
	try {
		const updatedUser = await UserService.updateUser(req, res)
		return res.status(200).json({
			message: "user updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
};

//delete user
UserController.deleteUser = async (req, res) => {
	try {
		const data = await UserService.deleteUser(req, res)
		return res.status(200).json({
			message: "user deleted successfully", data: data.user
		});

	} catch (error) {
		console.error(error);
		return res.status(403).send(error.message);
	}
}
//logout user

UserController.logout = async (req, res, next) => {
	res.cookie("token", "none", {
	  expires: new Date(Date.now() + 10 * 1000),
	  httpOnly: true
	})
	res.status(200).json({
	  success: true,
	  message: "Your are logged out"
	})
  }

UserController.getAllusers = async (req, res)=>{
	try {
		const getUser = await userModel.find({ role: "user"})
		return res.status(200).send({message: "user details sucessful", getUser})
	} catch (error) {
		console.err(error)
		return res.status(500).send({message:err.message})
	}
}



UserController.search = async (req, res)=>{
	let finalResults = await UserService.searchUser(req, res)
	return finalResults
}



module.exports = UserController
