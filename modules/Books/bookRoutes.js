
const router = require("express").Router()
const { useGuard } = require("../../middleware/guard");
const { requireAuth } = require("../../middleware/auth.guard");
const { useBodyValidator, useQueryValidator } = require("./bodyValidator")
const bookController = require("./bookController")
const bookGuard = require("./bookGuard")
const { booksValidator } = require("./bookValidator")
const { upload } = require('../../util/upload')
const awsMiddleware = require('../../util/aws_storage')
// const {parser} = require("../../util/cloud")
const { bookIdExists } = require('./bookService')

const checkIfUserIsAdmin = require('../../middleware/auth.guard');


router.patch('/update-return-books/:id', requireAuth, useGuard(bookGuard.checkIfUserIsAdmin),bookController.bookReturned)
router.post("/create", requireAuth, upload.single('bookCover'), useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.createBookValidator), useGuard(bookGuard.createBookGuard), bookController.createBook);
router.patch("/update/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), useBodyValidator(booksValidator.editUserValidator), useGuard(bookGuard.updateBookGuard), bookController.updateBook);
router.get("/get-books", bookController.getAllBooksPagination);
router.get('/search-books', bookController.searchAll)
router.get("/get-books/:id", bookController.getSingleBook);
router.get("/full-book-search", bookController.fullSearch )
//router.put("/approve-book/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), bookController.approveBook);
router.delete("/delete/:id", requireAuth, useGuard(bookGuard.checkIfUserIsAdmin), bookGuard.deleteBookGuard, bookController.deleteSingleBook);

module.exports = router;






