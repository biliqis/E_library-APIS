const borrowingModel = require("../booksBorrowing/borrowingModel")
const bookModel = require('../Books/bookModel')
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose")

const AdminService = {};

//GET A SINGLE REQUEST
AdminService.getSingleRequest = async (req, res) => {
    try {
        const requestId = req.params.borrowedId
        const bookData = await borrowingModel.findById(requestId);
        return res.status(200).json({ message: "fetched successfully", bookData })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err.message })
    };
};

//APPROVE TO BORROW A BOOK
AdminService.approveBookBorrowingRequest = async (req, res) => {
    try {
        const { borrowedId } = req.params
        let findPendingBookRequest = await borrowingModel.findById(borrowedId)
        

AdminService.declineBooks = async (req, res)=>{
    const { borrowedId} = req.params
    let pendingBooksRequest = await borrowingModel.findById(borrowedId)
}

        //FIND THE ACTUAL BOOK
        const book = await bookModel.findById(new ObjectId(findPendingBookRequest.bookId))

        //REDUCE BOOK COPIES
        book.noOfCopies = book.noOfCopies - 1
        await book.markModified("noOfCopies")
        await book.save()

        //UPDATE THE STATUS OF THE BORROWING MODEL
        findPendingBookRequest.status = "approved"
        await findPendingBookRequest.markModified("status")
        await findPendingBookRequest.save()
        return res.status(200).send({ message: "approved successfully!", book })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err.message })
    }
}
//GET ALL BORROWED BOOKS REQUEST
AdminService.getAllBorrowRequest = async (req, res) => {
    try {
        const allBooks = await borrowingModel.find().populate('bookId')
        return res.status(200).send({ message: "All books request successful", allBooks })
    } catch (error) {
        console.err(error)
        return res.status(500).send({ message: err.message })
    }
}

//GET ALL PENDING BORROWED BOOKS
AdminService.getAllPendingRequest = async (req, res) => {
    try {
        const pendingBooks = await borrowingModel.find({ status: "pending" }).populate('bookId')
        return res.status(200).send({ message: "pending books request successful", pendingBooks })
    } catch (error) {
        console.err(error)
        return res.status(500).send({ message: err.message })
    }
}


AdminService.updatingBook = async (req, res) => {
    return await bookModel.findByIdAndUpdate(new ObjectId(req.params.id), 
        {$inc : {'noOfCopies': +1}}, { new: true })
    }

module.exports = AdminService