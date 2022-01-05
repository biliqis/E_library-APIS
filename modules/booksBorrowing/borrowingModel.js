const mongoose =require("mongoose")
const { Schema } = mongoose

const applicationSchema = new Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    username:{
        type: String
    },
    appliedBooks: {
        type: Object
    },
    numberOfBooks: {
        type: Number
    },
    borrowDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model("apply", applicationSchema)