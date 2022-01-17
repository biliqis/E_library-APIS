const bookService = require("./bookService")
const bookModel = require("./bookModel")
const path = require('path')
const fs = require('fs')
const {cloudinary} = require ("../../util/cloud")
const mongoose = require('mongoose')

const bookController = {}
//create a book
bookController.createBook = async (req, res) => {
    try {
        const result = req.file?.location
              let bookObj = {...req.body, bookCover:result? result : null}

        const bookData = await bookService.createBookService(req,bookObj);
        return res.json({ message:"book created successfully",bookData })
    } catch (error) {
        console.log(error)
        return res.json({ message: "Error Occurred" });
    }
}

bookController.searchAll = async (req, res) => {
    let searchResults = await bookService.searchBooks(req, res)
    return searchResults
}

bookController.searchAll = async (req, res) => {
    let searchResults = await bookService.searchBooks(req, res)
    return searchResults
}

bookController.searchAllUser = async (req, res) => {
    let results = await bookService.searchUsers(req, res)
    return results
}


//add a book
bookController.updateBook = async (req, res, next) => {
    const bookId = req.params.id
    // const data = await editUserValidator.validateAsync(req.body);
    const bookData = await bookService.updateBookService(bookId, req.body);
    return res.json({ message: `Book with the ID ${bookId} is updated successfully`, bookData })

}


//get all books with pagination
bookController.getAllBooks = async (req, res) => {
    const allBooks = await bookService.getAllBooksPaginated()
    return res.status(200).json({ message: "Books retrieved successfully", allBooks })
}

bookController.fullSearch = async (req, res) => {
    const { book, page, limit } = req.query;
    try {
        const allBooks = await bookService.searchBooks(book, page, limit)
        return res.status(200).json({ message: "Books retrieved successfully", allBooks })
    } catch (error) {
        console.error(error)
        return await res.status(500).json({message:error.message})  
    }
}

//delete books
bookController.deleteSingleBook = async (req, res, next) => {
    await bookService.deleteBookService(req.params.id)
    return res.status(200).json({ message: `Books with the ID ${req.params.id} successfully deleted` })
}

//get single
bookController.getSingleBook = async (req, res, next) => {
    try {
        const book = await bookService.bookIdExists(req.params.id)
        return res.status(200).json({ message: "Book retrieved successfully", book })
        
    } catch (err) {
        return res.status(500).send({message:err.message})
        
    }
}

bookController.getAllBooksPagination = async (req, res, next) => {
    let { page, limit } = req.query
    try {
        const books = await bookService.getAllBooksPaginated(page=1, limit=10)
        const allBooks = await bookModel.find({})
        //IF NO BOOKS IN THE DB
        if (allBooks.length === 0) return res.status(200).send({message:"No books added yet, please check back"})
        res.status(200).json({
            message: 'success',
            length: `${books.length} data retrieved`, data: books
        })

    } catch (err) {
        return res.json({ message: err.message })
    }
}

bookController.bookReturned = async(req,res)=>{
await bookService.updateReturnBook(req.params.id)
return res.status(200).json({ message: `Books with the ID ${req.params.id} successfully updated` })
}

module.exports = bookController