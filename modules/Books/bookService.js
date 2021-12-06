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
	const book = await bookModel.findById(bookId)
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

bookService.searchBooks = async (req, res) => {
	try {
		let book = req.query.book
		const bookResult = await bookModel.find({ $text: { $search: book } })
		if (bookResult.length === 0) return res.status(404).send({ message: `no search results for ${book} found` })
		return res.status(200).send({ results: bookResult })
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: error.message })

	}
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