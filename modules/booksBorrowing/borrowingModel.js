const { string } = require("joi")
const mongoose = require("mongoose")
const bookSchema = require('../Books/bookModel')

const borrowedBookSchema = new mongoose.Schema({
    bookId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    numberOfBooksToBeBorrowed: {
        type: Number,
        default:1
    },
    
    borrowDate: {
        type: Date,
        default:Date.now
    },

    returnDate: {
        type: Date
    },
    status:{
        type:String,
        default:"pending"
    },
    returned:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("borrowedBook",borrowedBookSchema)