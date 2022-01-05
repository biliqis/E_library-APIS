const bookModel = require("../Books/bookModel");
const User = require("../user/userModel");
const bookBorrowing = require("./borrowingModel");
const { bookTitleExists, bookIdExists } = require("../Books/bookService");
const ObjectID = require("mongodb").ObjectId;
// const { checkIfBooksExists } = require("./borrowingGuard");
const { UserService } = require("../user/userService");
const bookService = require("../Books/bookService");

//FIND BOOK IN STORE BY ID
const booksBorrowingService = {};
module.exports.startAndEndDates = (startDate, days) => {
  const endDate = new Date().setDate(startDate.getDate() + days);
  if (days > 3)
    throw new Error("You can not borrow a book for more than three days");
  return endDate;
};

booksBorrowingService.findBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const bookResult = await bookModel.findById(id);
    return res.status(200).send({ message: "success" });
    if (!bookResult) return res.status(404).send({ message: "no books found" });
    //return res.json({ bookResult })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

booksBorrowingService.getSingleBookService = async (requestId) => {
	return await bookModel.findOne(requestId);
},

booksBorrowingService.getBorrowBookByUser = async (req, res) => {
  try {
    const borrowedBooks = await bookBorrowing.find({
      user: new ObjectID(req.user._id),
    });
    // if (borrowedBooks.length === 0) return res.status(404).send({message:"sorry, you have not borrowed any book"})
    return res.status(200).send({ message: "successful", data: borrowedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

booksBorrowingService.propExists = async (prop) => {
	return bookModel.countDocuments(prop).then((count) => count > 0);
};

//BORROW BOOKS BY ID
booksBorrowingService.createBookApplicationService = async (req, res, applicationDetails, requestUser) => {
  const bookDetails = await booksBorrowingService.getSingleBookService({_id: new ObjectID(applicationDetails.bookId)});
  
	const model = await new bookBorrowing({ ...applicationDetails, userId: requestUser._id, appliedBooks: bookDetails, username: requestUser.username }).save();

    const dataPz = await bookModel.updateOne({_id: new ObjectID(bookDetails._id)},  {$push: { requestUsers: requestUser }})
    if( applicationDetails.numberOfBooks > 1 || applicationDetails.numberOfBooks < 1 ) return res.status(400).json({ message: "You cannot select number of copies more than 1, neither can it be greater than one for the same type of book"})
	  await booksBorrowingService.increaseNumberOfRequest(bookDetails._id)
    return  model;
}

booksBorrowingService.countBooksAvailable = async(bookId) => {
  const requestedBook =  await booksBorrowingService.getSingleBookService({ _id: new ObjectID(bookId) });
      if(requestedBook.noOfCopies < 1){
          await bookModel.findOneAndUpdate( {id: new ObjectID(bookId)}, 
          { $set: {'isAvailable': false}}, { new: true }).exec();
      };
      return requestedBook;
}

booksBorrowingService.increaseNumberOfRequest = async(bookId) => {
  await bookModel.findOneAndUpdate( {id: new ObjectID(bookId)}, 
  { $inc: {'numberOfRequest': +1}}, { new: true }).exec();
}

//track pending Books using filter method
booksBorrowingService.pendingBooks = async (req, res) => {
  try {

    const pendings = await bookBorrowing.find({ bookId: new ObjectID(req.params.id), status: "pending" }).lean();
    // const pendings = await bookBorrowing.find().lean();
    console.log(pendings)
    return res.status(200).send({ message: pendings });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

//Tracking the return books
booksBorrowingService.returnBooks = async (req, res) => {
  try {
    // const returnedBooks = await bookBorrowing.find({ returned: true }).lean();
    const returnedBooks = await bookBorrowing.find({ status:"returned"}).lean();
    if (returnedBooks.length === 0)
      return res.status(404).json({ message: "no returned books present" });
    return res.status(200).send({ data: returnedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};
//checkUserBorrowOnce
booksBorrowingService.checkUserBorrowOnce = async (req, res, next) => {
  try {
    const getAllCurrentBorrowed = bookBorrowing
      .find({ returned: false })
      .lean();
    const filterUserId = await getAllCurrentBorrowed.findOne({
      user: req.user._id,
    });
    if (filterUserId)
      return res
        .status(400)
        .send({ message: "you cannot borrow more than one book" });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

booksBorrowingService.getAllBorrowedBooksByAUserService = async(userId) => {
  return bookBorrowing.find({userId: new ObjectID(userId), status: 'approved'})
}
//get All approve books
booksBorrowingService.getApproveBook = async (req, res) => {
  try {
    const approveBooks = await bookBorrowing.find({ bookId: req.params.id, status: "approved" });
    return res.status(200).send({ data: approveBooks });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { booksBorrowingService };