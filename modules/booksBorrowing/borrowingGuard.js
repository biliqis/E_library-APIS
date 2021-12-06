const bookModel = require('../Books/bookModel')

module.exports.checkIfBooksExists = async (bookId) => {
    const findBook = await bookModel.findOne({_id:bookId})
    if (!findBook) throw new Error("this book cannot be found!")
}