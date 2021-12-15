const bookModel = require("../Books/bookModel");
const User = require("../user/userModel");
const bookBorrowing = require("./borrowingModel");
const { bookTitleExists, bookIdExists } = require("../Books/bookService");
const ObjectID = require("mongodb").ObjectId;
const { checkIfBooksExists } = require("./borrowingGuard");
const { UserService } = require("../user/userService");
const bookService = require("../Books/bookService");

//FIND BOOK IN STORE BY ID
booksBorrowingService = {};

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

booksBorrowingService.userBorrowBook = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: new ObjectID(req.user._id) });

    if (!singleUser) throw new Error("user not found!");
    let bookId = req.body.bookId;
    const bookData = await bookIdExists(bookId);
    return res.status(200).send({ message: "success", bookData });
    if (!bookData) {
      return res.status(404).send({ message: "book not found" });
      //throw new Error("book not found")
    }

    const bookDto = {
      bookId: bookData._id,
      user: singleUser._id,
      numberOfDays: Number(req.body.numberOfDays),
      borrowDate: new Date(),
      returnDate: new Date().setDate(
        new Date().getDate() + req.body.numberOfDays
      ),
    };
    //check if the book exists
    await checkIfBooksExists(bookDto.bookId);

    const findBook = await bookModel.findOne({ _id: bookDto.bookId });
    console.log(findBook);
    // // if (!findBook) throw new Error("this book cannot be found!")
    // let checkFunc = await this.checkNumBooks(bookDto.numberOfBooksToBeBorrowed,findBook.numberOfBooksInStore)
    if (findBook.noOfCopies <= 1) {
      return res
        .status(400)
        .json({
          message:
            "You cannot borrow all or more than the number of books in store",
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

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

//BORROW BOOKS BY ID

booksBorrowingService.userBorrowBookById = async (req, res) => {
  try {
    console.log(req.body.bookId);
    const findUser = await bookBorrowing.find({
      userId: new ObjectID(req.user._id),
    });
    console.log(findUser);
    // if(findUser.length > 1) throw new Error("You cannot make request, your previous request will be duely attended to!")
    const singleUser = await User.findOne({ _id: new ObjectID(req.user._id) });
    if (!singleUser) throw new Error("user not found!");
    await bookModel.updateOne(
      { _id: new ObjectID(req.body.bookId) },
      { $push: { requestUsers: singleUser } }
    );
    let borrowedBooks = req.body.bookId;
    let bookData = await bookIdExists(borrowedBooks);
    if (!bookData) {
      throw new Error("book not found");
    }
    const bookDto = {
      bookId: bookData._id,
      user: singleUser._id,
      numberOfDays: Number(req.body.numberOfDays),
      borrowDate: new Date(),
      returnDate: new Date().setDate(
        new Date().getDate() + req.body.numberOfDays
      ),
    };

    if (bookData.noOfCopies <= 1) {
      return res
        .status(400)
        .json({
          message:
            "You cannot borrow all or more than the number of books in store",
        });
    }

    this.startAndEndDates(bookDto.borrowDate, bookDto.numberOfDays);
    let newBorrow = new bookBorrowing(bookDto);
    await newBorrow.save();
    return res
      .status(201)
      .send({
        success: true,
        message:
          "request submitted successfully, the moderators will review your request",
        newBorrow,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

//track pending Books using filter method
booksBorrowingService.pendingBooks = async (req, res) => {
  try {
    const pendings = await bookBorrowing.find({ status: "pending" }).lean();
    if (pendings.length === 0)
      return res
        .status(404)
        .json({ message: "there are pending borrowed books!" });
    return res.status(200).send({ message: pendings });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: err.message });
  }
};

//Tracking the return books
booksBorrowingService.returnBooks = async (req, res) => {
  try {
    const returnedBooks = await bookBorrowing.find({ returned: true }).lean();
    if (returnedBooks.length === 0)
      return res.status(404).json({ message: "no returned books present" });
    return res.status(200).send({ data: returnedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: err.message });
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
//get All approve books
booksBorrowingService.getApproveBook = async (req, res) => {
  try {
    const approveBooks = await bookBorrowing.find({ status: "approved" });
    if (approveBooks === 0)
      return res.status(200).send({ message: "no approved books present" });
    return res.status(200).send({ data: approveBooks });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};
module.exports = booksBorrowingService;
