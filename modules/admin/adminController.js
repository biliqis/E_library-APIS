const adminService = require("./adminService")

const AdminController = {};

//GET SINGLE REQUEST
AdminController.getSingleRequest = async (req, res, next) => {
	const book = await adminService.getSingleRequest(req, res)
	return res.status(200).json({ message: "All request retrieved", book })
}

//APPROVE BORROWED BOOK
AdminController.approveBookBorrowing = async (req, res) => {
	return await adminService.approveBookBorrowingRequest(req, res)
}

//GET ALL BORROWED BOOKS
AdminController.getAllBorrowed = async (req,res) =>{
	return await adminService.getAllBorrowRequest(req,res)
}

//GET ALL PENDING BOOKS
AdminController.getAllPendingBooks = async (req, res)=>{
	return await adminService.getAllPendingRequest(req, res)
}

AdminController.updatingBookControl= async (req, res) => {
	try {
		const replacedBook = await adminService.updatingBook(req, res)
		return res.status(200).json({
			message: "books replaced successfully",
			data: replacedBook,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
};

module.exports = AdminController


