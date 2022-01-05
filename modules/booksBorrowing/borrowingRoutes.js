const router = require("express").Router()
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const { requireAuth } = require("../../middleware/auth.guard");
const { BookApplicationValidator } = require("./borrowingValidator")
const {userIdExists, } = require('../user/userGuard')
const { BookApplicationGuard } = require("./borrowingGuard")

const checkIfUserIsAdmin = require ("../../middleware/auth.guard")
const { booksBorrowingController}= require("./borrowingController");
// const { userBorrowBook, userBorrowBookById,checkUserBorrowOnce, getApproveBook } = require("./borrowingService");
const bookGuard = require("../Books/bookGuard");


// router.post('/add-borrowed-book',requireAuth, checkUserBorrowOnce, createUserBorrowBook)
router.get('/get-borrowed-books', requireAuth, booksBorrowingController.getUserBorrowedBooks)
router.post('/borrow-book',requireAuth, useBodyValidator(BookApplicationValidator.createBookApplicationValidator), BookApplicationGuard.createBookApplicationGuard, booksBorrowingController.createApplicationController)
router.get('/pending-books/:id', requireAuth, booksBorrowingController.getPendings )
router.get('/get-return-books', requireAuth, booksBorrowingController.getReturnBooks)
router.get('/get-approve-books/:id',requireAuth, booksBorrowingController.getAllApproved)
module.exports = router

