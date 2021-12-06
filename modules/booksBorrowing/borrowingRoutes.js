const router = require("express").Router()
const {useBodyValidator, useQueryValidator } = require("./bodyValidator")
const { requireAuth } = require("../../middleware/auth.guard");
const { bookBorrowingValidator } = require("./borrowingValidator")
const {userIdExists} = require('../user/userGuard')

const checkIfUserIsAdmin = require ("../../middleware/auth.guard")
const { searchBooksById ,createUserBorrowBook,getUserBorrowedBooks, getPendings, getReturnBooks, getAllApproved}= require("./borrowingController");
const { userBorrowBook, userBorrowBookById,checkUserBorrowOnce, getApproveBook } = require("./borrowingService");
const bookGuard = require("../Books/bookGuard");


router.post('/add-borrowed-book',requireAuth, checkUserBorrowOnce, createUserBorrowBook)
router.get('/get-borrowed-books', requireAuth,getUserBorrowedBooks)
router.post('/borrow-book',requireAuth, userBorrowBookById)
router.get('/pending-books', requireAuth, getPendings )
router.get('/get-return-books', requireAuth, getReturnBooks)
router.get('/get-approve-books',requireAuth, getAllApproved)
module.exports = router

