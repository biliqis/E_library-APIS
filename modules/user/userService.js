const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXP;
const bcrypt = require("bcryptjs");
const UserModel = require("./userModel");
const userModel = require("./userModel");

const UserService = {};
UserService.generateJwt = (userObj) => {
  return jwt.sign(userObj, jwtSecretKey, {
    expiresIn: process.env.JWT_EXP,
  }); 
};

UserService.comparePassword = async (password, password2) => {
  return bcrypt.compare(password, password2);
};

UserService.propExists = (user) => {
  return UserModel.countDocuments(user).then((count) => count > 0);
};


UserService.searchUsers = async (user, page, limit) => {
	if(user) {
		return await userModel.find({ $text: { $search: user } })
		.exec()
	}
	return await userModel.find()
}



//helper function to find a single user before logging in
UserService.findSingle = (email) => {
  return UserModel.findOne({ email: email });
};

UserService.findUsernameEmail = (data) => {
  return UserModel.findOne(data);
};

UserService.findSingleById = async (id) => {
  return await UserModel.findById(id);
};

UserService.updateUser = async (req, res) => {
  return await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
};

UserService.deleteUser = async (req, res) => {
  const id = req.params.id;
  let user = await UserModel.findById(id);
  let deleteUser = await UserModel.deleteOne({ _id: id });
  return { user, deleteUser };
};

UserService.userSignUp = async (req, res) => {
  const user = await UserModel.create(req.body);
  const token = UserService.generateJwt({
    user_id: user._id,
    roles: req.body.role,
  });
  return { user, token };
};

UserService.userLogin = async (req, res) => {
  const user = await UserModel.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  }).select("+password");

  if (!user) throw new Error("not found");
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    throw new Error("incorrect credentials!");
  }
  const token = UserService.generateJwt({
    user_id: user._id,
    roles: user.role,
  });
  return { user, token };
};



UserService.searchUser = async (user, page, limit)=>{
    if(user) {
      return await userModel.find({$text: { $search: user}, role:"user"})
    }
    return await userModel.find({role:"user"})
}


module.exports.UserService = UserService;
