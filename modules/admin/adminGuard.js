const booksBorrowingModel = require("../../modules/booksBorrowing/borrowingModel")
const ObjectId = require("mongodb").ObjectId;
const AdminBorrowingGuard = {};


//CHECK IF BOOK EXISTS
AdminBorrowingGuard.IdExists = async (propId) => {
    return await booksBorrowingModel.findOne(propId)

}

AdminBorrowingGuard.checkIfBorrowingExistGuard = async (req, res)=>{
    const { borrowedId } = req.params
    const checkBook = await AdminBorrowingGuard.IdExists(borrowedId)
    if (!checkBook) return res.status(400).send({message:"Request does not exist"})
}

AdminApprovalGuard.checkUpdateReturnGuard = async (req, res, next) => {
	const { requestId } = req.params;
	const check = await AdminBorrowingGuard.IdExists({ userId: new ObjectId(requestId) });
	if(!check) throw res.status(400).json({ message: "Invalid request ID"}) 

	const checkIfRequestIsPending = await AdminBorrowingGuard.IdExists({ userId: new ObjectId(requestId)  });
	if(checkIfRequestIsPending.status === 'pending') if(!check) throw res.status(400).json({ message: "Request cannot be updated as returned yet"}) 

	const checkIfRequestIsReturned = await AdminBorrowingGuard.IdExists({ userId: new ObjectId(requestId)  });
	if(checkIfRequestIsReturned.status === 'returned') throw res.status(400).json({ message: "This book has previously been updated"}) 
	next()
}

module.exports = AdminBorrowingGuard
