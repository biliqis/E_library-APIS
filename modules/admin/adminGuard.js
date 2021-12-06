const booksBorrowingModel = require("../../modules/booksBorrowing/borrowingModel")
const ObjectId = require("mongodb").ObjectId;
const AdminBorrowingGuard = {};


//CHECK IF BOOK EXISTS
AdminBorrowingGuard.IdExists = async (propId) => {
    return await booksBorrowingModel.findById(propId)

}

AdminBorrowingGuard.checkIfBorrowingExistGuard = async (req, res)=>{
    const { borrowedId } = req.params
    const checkBook = await AdminBorrowingGuard.IdExists(borrowedId)
    if (!checkBook) return res.status(400).send({message:"this book does not exist"})
}

module.exports = AdminBorrowingGuard
