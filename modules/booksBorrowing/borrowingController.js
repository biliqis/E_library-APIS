const { booksBorrowingService } = require("./borrowingService")
const { booksBorrowingValidator } = require("./borrowingValidator")

const booksBorrowingController ={};

booksBorrowingController.searchBooksById = async (req,res) => {
    return await findBookById(req,res)
}

booksBorrowingController.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}

booksBorrowingController.createApplicationController = async (req, res, next) => {
    try{
        const applicationDetails = req.body;
        const requestUser = req.user;

        const data = await booksBorrowingService.createBookApplicationService(req, res, applicationDetails, requestUser)

        return res.status(200).json({
            message: `Your request to borrow this books has been sent, proceed to make payment`,
            data: data 
        })
    } catch(err){
        res.status(500).json({message: "Not found"})
    }
}

booksBorrowingController.getUserBorrowedBooks = async (req,res) => {
    return await booksBorrowingService.getBorrowBookByUser(req,res)
}


booksBorrowingController.getPendings = async(req,res)=>{
    return await booksBorrowingService.pendingBooks(req,res)
}

booksBorrowingController.getReturnBooks = async(req,res)=>{
    return await booksBorrowingService.returnBooks(req,res)
}

booksBorrowingController.getAllApproved = async(req,res)=>{
    return await booksBorrowingService.getApproveBook(req,res)
}

booksBorrowingController.getUserBorrowedBooksController = async(req, res, next) => {
        const userId  = req.user._id
        
        const data = await booksBorrowingService.getAllBorrowedBooksByAUserService(userId)
        return res.status(200).json({
            message: `Successfully retrieved books borrowed by ${userId}`,
            data
        })

}
module.exports = {booksBorrowingController}