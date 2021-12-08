const adminService = require("./adminService")

const AdminController = {};

//GET SINGLE REQUEST
AdminController.getSingleRequest = async (req, res, next) => {
	const book = await adminService.getSingleRequest(req, res)
	return res.status(200).json({ message: "All request retrieved", book })
}

//APPROVE BORROWED BOOK
AdminController.approveBookBorrowing = async (req, res) => {
	try{
		const { requestId } = req.params;
		console.log(requestId)
		const data = await adminService.approveBookBorrowingRequest(requestId)
		return res.status(200).json({ message: "Request has been approved", data })
	} catch(err){
		
		res.status(500).send(err.message);
	}
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
		const { requestId } = req.params
		const replacedBook = await adminService.updatingBook(requestId)
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


