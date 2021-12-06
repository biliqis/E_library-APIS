const router = require("express").Router();

const userRoutes = require("../../modules/user/userRoutes");
const bookRoutes = require('../../modules/Books/bookRoutes')
const booksBorrowing=require("../../modules/booksBorrowing/borrowingRoutes")
const adminRoutes = require("../../modules/admin/adminRoutes")

const viewsRoutes = require("../../modules/views");

router.use("/api/v1", userRoutes);
router.use("/api/v1/book", bookRoutes);
router.use("/api/v1/books-borrowing", booksBorrowing);
router.use("/api/v1/admin-approval", adminRoutes);
router.use("/", viewsRoutes);





module.exports = router;
