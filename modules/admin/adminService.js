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
// AdminService.approveBookBorrowingRequest = async (requestId) => {
//     let reduceAvailableBooks = await AdminService.initiateAvailableBooksReduction(requestId);
//     let initiateBookBorrowedAddition = await AdminService.initiateBookBorrowedAddition(requestId);
//     let BorrowRequest = await borrowingModel.findOneAndUpdate({ userId: new ObjectId(requestId) }, { $set: {'status': 'approved'}}, { new: true }).exec();
//     await AdminService.reduceNumberOfRequest(requestId)

//     return BorrowRequest;
  
// }

AdminService.approveBookBorrowingRequest = async(requestIds, bookId) => {
	await bookModel.findOneAndUpdate( {_id: new ObjectId(bookId)}, 
        {$inc : {'availableCopies': -(requestIds.match(/,/g) || [].length + 1), 'borrowedCopies': (requestIds.match(/,/g) || []).length + 1, 'numberOfRequest': -(requestIds.match(/,/g) || [].length + 1)}}, { new: true }).exec();
	
		return await borrowingModel.updateMany({_id: {$in : requestIds }},  { $set: {'status': 'approved'}}, {multi: true})
}

//GET ALL BORROWED BOOKS REQUEST
AdminService.getAllBorrowRequest = async (req, res) => {
    const allBooks = await borrowingModel.find().populate('bookId')
    return res.status(200).send({ message: "All books request successful", allBooks })
    
}

AdminService.reduceNumberOfRequest = async(requestId) => {
	let BorrowRequest = await AdminService.getSingleBorrowRequestService(requestId);
    await bookModel.findOneAndUpdate( {_id: new ObjectId(BorrowRequest.bookId)}, 
    { $inc: {'numberOfRequest': -1}}, { new: true }).exec();
}

AdminService.initiateAvailableBooksReduction = async (requestId) => {
	let BorrowRequest = await AdminService.getSingleBorrowRequestService(requestId);
    return await bookModel.findOneAndUpdate( {_id: new ObjectId(BorrowRequest.bookId)}, 
        {$inc : {'availableCopies': -1}}, { new: true }).exec();
}

AdminService.initiateBookBorrowedAddition = async (requestId) => {
	let BorrowRequest = await AdminService.getSingleBorrowRequestService(requestId);
    return await bookModel.findOneAndUpdate( { bookId: new ObjectId(BorrowRequest.bookId) }, 
        {$inc : {'borrowedCopies': +1}}, { new: true }).exec();
}

//GET ALL PENDING BORROWED BOOKS
AdminService.getAllPendingRequest = async (req, res) => {
    try {
        const pendingBooks = await borrowingModel.find({ status: "pending" }).populate('bookId')
        return res.status(200).send({ message: "pending books request successful", pendingBooks })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}

AdminService.updatingBook = async(requestIds, bookId) => {
	await bookModel.findOneAndUpdate( {_id: new ObjectId(bookId)}, 
	{$inc : {'availableCopies': (requestIds.match(/,/g) || []).length + 1, 'borrowedCopies': -(requestIds.match(/,/g) || [].length + 1)}}, { new: true }).exec();
	let BorrowRequest = await borrowingModel.updateMany({_id: {$in : requestIds }},  { $set: {'status': 'returned'}}, {multi: true})

	return BorrowRequest;
}

AdminService.getSingleBorrowRequestService = async (requestId) => {
	return await borrowingModel.findOne({userId: requestId });
}

module.exports = AdminService