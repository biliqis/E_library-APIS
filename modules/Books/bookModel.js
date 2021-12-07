const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = require('mongodb').ObjectId

const BookSchema = new Schema(
    {
        bookTitle: {
            type: String,
        },
        requestId: {
			type: mongoose.Schema.Types.ObjectId,
            default:new ObjectId()
		},
        
        authorName: {
            type: String,
        },

        bookCover: {
            type: String
        },

        isAvailable: {
            type: Boolean,
        
        },
        requestUsers: {
            type: Array
        },

        pricePerBook: {
            type: Number
        },

        isbnNumber: {
            type: String,
        },

        noOfCopies: {
            type: Number,
        },

        availableCopies: {
            type: Number,
        },

        borrowedCopies: {
            type: Number,
        },


        description: {
            type: String,
        },

        publishDate: {
            type: Date,
            default:Date.now
        },

    },

    {
        timestamps: true,
    }
);

//enable search indexing
BookSchema.index({ '$**': 'text' })
module.exports = mongoose.model("book", BookSchema);





