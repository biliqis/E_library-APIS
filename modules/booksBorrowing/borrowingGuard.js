const { booksBorrowingService } = require("./borrowingService");
const ObjectId = require("mongodb").ObjectId;
const bookModel = require("../Books/bookModel")
const applicationModel = require("../booksBorrowing/borrowingModel")

const BookApplicationGuard = {};

BookApplicationGuard.checkIfBooksExists = async (bookId) => {
    const findBook = await bookModel.findOne({_id:bookId})
    if (!findBook) throw new Error("this book cannot be found!")
}
BookApplicationGuard.createBookApplicationGuard = async (req, res, next) => {
    const alreadyExists = await booksBorrowingService.propExists({ bookId: req.body.bookId });

    if ( !alreadyExists ) throw res.status(400).json({ message: "Book does not exist"})
    
    const checkIfUserHasAlreadyBorrowABook = await applicationModel.findOne({ userId: new ObjectId(req.user._id), bookId: new ObjectId(req.body.bookId), status: 'pending'})
    if(checkIfUserHasAlreadyBorrowABook) throw res.status(400).json({ message: "You cannot borrow same book twice, admin is processing your request"})

    const checkIfUserHasAlreadyReturnedBook = await applicationModel.findOne({ userId: new ObjectId(req.user._id), bookId: new ObjectId(req.body.bookId), status: 'approved'})
    if(checkIfUserHasAlreadyReturnedBook) throw res.status(400).json({ message: "You cannot borrow same book twice, you have not returned the copy of this book you borrowed"})

    const numberAvailable = await booksBorrowingService.countBooksAvailable(req.body.bookId)
    if( numberAvailable.isAvailable === false &&  numberAvailable.noOfCopies < 1) throw res.status(400).json({ message: "Sorry this book is currently out of stock, check back in two day's time."}) 

    next()
};

module.exports = { BookApplicationGuard }