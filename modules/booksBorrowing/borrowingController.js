const { findBookById,userBorrowBook,getBorrowBookByUser, pendingBooks, returnBooks,getApproveBook} = require("./borrowingService")
const { booksBorrowingValidator } = require("./borrowingValidator")

booksBorrowingController ={};

booksBorrowingController.searchBooksById = async (req,res) => {
    return await findBookById(req,res)
}

booksBorrowingController.createUserBorrowBook = async (req,res) => {
    return userBorrowBook(req,res)
}

booksBorrowingController.createUserBorrowBookId = async (req,res) => {
    return userBorrowBookById(req,res)
}


booksBorrowingController.getUserBorrowedBooks = async (req,res) => {
    return await getBorrowBookByUser(req,res)
}


booksBorrowingController.getPendings = async(req,res)=>{
    return await pendingBooks(req,res)
}

booksBorrowingController.getReturnBooks = async(req,res)=>{
    return await returnBooks(req,res)
}

booksBorrowingController.getAllApproved = async(req,res)=>{
    return await getApproveBook(req,res)
}


module.exports = booksBorrowingController