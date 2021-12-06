const jwt = require("jsonwebtoken");
const User = require("../modules/user/userModel");
const requireAuth = async (req, res, next) => {
	try {
		const auth = req.headers["authorization"];

		if (auth) {
			let token = auth.split("Bearer")[1].trim();
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decoded, "just finish splitting the token ---------");
			const currentUser = await User.findById(decoded.user_id)
			if (!currentUser) {
				return res.status(401).json({ message: "logged out" });
			}
			req.user = currentUser
			
		}else {
			res.status(401).json({message : "Invalid token, sign-in to access this resource"})
		}
		next();
	} catch (error) {
		console.error(error)
		return res.status(401).json({message :"Invalid token, sign-in to access this resource"})
	}
};

// check current user
const checkUser = async (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}

};


const checkIfUserIsAdmin = (req, res) => {
	if (req.user.role === "user") return res.status(400).json({ message: "Sorry you are not allowed to perform this operation" })

}



module.exports = { requireAuth, checkUser, checkIfUserIsAdmin };


