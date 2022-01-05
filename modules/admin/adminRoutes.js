const router = require ("express").Router();
const { requireAuth, checkIfUserIsAdmin } = require("../../middleware/auth.guard");
const { useBodyValidator, useQueryValidator } = require("./bodyValidator");
const AdminBorrowingGuard = require("./adminGuard");
const {useGuard} = require("../../middleware/guard")
const  AdminController = require ("../admin/adminController");
const AdminService = require("./adminService");
const { booksBorrowingController } = require("../booksBorrowing/borrowingController");

router.get("/single-request/:borrowedId",requireAuth, useGuard(AdminBorrowingGuard.checkIfBorrowingExistGuard),AdminController.getSingleRequest);
router.patch("/approve-book-borrowing/:requestIds/:bookId", requireAuth, useGuard(checkIfUserIsAdmin),AdminController.approveBookBorrowing)
router.get("/get-all-borrow-requests", requireAuth, useGuard(checkIfUserIsAdmin), AdminController.getAllBorrowed);
router.get("/get-all-pending-requests", requireAuth, useGuard(checkIfUserIsAdmin), AdminController.getAllPendingBooks)
router.patch("/updates-record/:requestIds/:bookId", requireAuth, useGuard(checkIfUserIsAdmin), AdminController.updatingBookControl)
router.get("/books-borrowed/", requireAuth, booksBorrowingController.getUserBorrowedBooksController)

module.exports = router;