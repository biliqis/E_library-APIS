const router = require("express").Router();
const { useBodyValidator, useQueryValidator }= require("./bodyValidator");


const  { UserValidator } = require("./userValidation")
const userController  = require("./userController")
const { requireAuth } = require("../../middleware/auth.guard");
const { signUpValidator, loginValidator, } = require("../../middleware/validator");
const { useGuard } = require("../../middleware/guard");
const { userGuard }= require("./userGuard");

router.post("/user/sign-up", useBodyValidator(UserValidator.createUserValidator), useGuard(userGuard.userSignUpGuard), userController.userSignUp);
router.post("/user/login", useBodyValidator(UserValidator.loginUserValidator), useGuard(userGuard.userloginGuard), userController.userLogin);
router.put("/update-user/:id", useBodyValidator(UserValidator.editUserValidator),requireAuth,  userController.updateUser);
router.delete("/delete-user/:id", useBodyValidator(UserValidator.createUserValidator),requireAuth, useGuard(userGuard.userIdExists),	userController.deleteUser);
router.get("/logout-user",requireAuth, userController.logout)
router.get("/single-user", requireAuth, userController.getSingleUser)
router.get("/get-all-user", userController.getAllusers)
module.exports = router

