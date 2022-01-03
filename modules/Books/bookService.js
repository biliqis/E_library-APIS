const bookModel = require("./bookModel")
const fs = require('fs');
const path = require('path')

const { countDocuments } = require('../user/userService')

const bookService = {};

bookService.bookTitleExists = async (bookTitle) => {
	const count = await bookModel.findOne({ bookTitle });
	return count
}

bookService.bookIdExists = async (bookId) => {
	const book = await bookModel.findById({_id: bookId})
	if (!book) throw new Error("book not found!",404)
	return book
}

bookService.countBooks = async (books) => {
	let totalBooks = await bookModel.countDocuments(books)
	return totalBooks
}

bookService.getAllBooksPaginated = async (page, limit) => {
	const books = await bookModel.find()
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();
	return books
}

// bookService.searchText = async (page, book, limit) => {
// 	let book = req.query.book
// 	if(book || page || limit) {
// 		return await bookModel.find({$text: {$search: book }})
// 		.limit(limit * 1)
// 		.skip((page - 1) * limit)
// 		.exec();
// }
// return await bookModel.find()

// }

bookService.createBookService = async (req, book) => {
	try {
		let newBook = {...book, approved:"pending"}
		const model = new bookModel(newBook)
		return model.save()
	} catch (error) {
		console.error(error)
	}

}
bookService.updateBookService = async (bookId, book) => {
	return bookModel.findByIdAndUpdate(
		{ _id: bookId },
		{ ...book },
		{ new: true }
	);
}

bookService.deleteBookService = async (bookId) => {

	return await bookModel.deleteOne({ _id: bookId });
}

bookService.searchBooks = async (book, page, limit) => {
	if(book || page || limit) {
		return await bookModel.find({ $text: { $search: book } })
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec()
	}
	return await bookModel.find()
}
bookService.approveBook = async (req, res) => {
	try {
		const id = req.params.id
		const updateBook = await bookModel.findByIdAndUpdate(id,req.body)
		return res.status(200).send({message:"book successfully updated!",updateBook})
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: error.message })

	}
}

    //RETURN BOOKS
bookService.updateReturnBook =  async(req,res)=>{
	try {
		 const id = req.params.id
		 const returnBooks = await bookModel.findByIdAndUpdate(id,{returned:true})
		 return res.status(200).send({message:"book successfully returned!",returnBook})

	} catch (error) {
		console.err(error)
		return res.status(200).send({message:err.message})
		
	}
}


module.exports = bookService