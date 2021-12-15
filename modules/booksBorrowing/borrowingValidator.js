
const Joi = require("joi");

const booksBorrowingValidator = {};

booksBorrowingValidator.booksBorrowingValidator = Joi.object().keys({

  bookId: Joi.string().optional().messages({
    "string.base": `"Book ID" should be of type 'string'`,
    "string.empty": `"Book ID" cannot be an empty string`,
  }),

  userId: Joi.string().optional().messages({
    "string.base": `"User ID" should be of type 'string'`,
    "string.empty": `"User ID" cannot be an empty string`,
  }),

  numberOfBooks: Joi.number().integer().default(1).required().messages({
    "string.base": `"Number of books" should be of type 'number'`,
    "string.empty": `"Number of books" cannot be an empty string`,
  }),

  returned: Joi.boolean().default(false).optional(),

  borrowDate: Joi.date().required().messages({
    "string.base": `"Borrow date" should be of type 'date'`,
    "string.empty": `"Borrow date" cannot be an empty string`,
  }),
  
  returnDate: Joi.date().greater(Joi.ref('borrowDate')).required().messages({
    "string.base": `"Return date" should be of type 'number'`,
    "string.empty": `"Return date" cannot be an empty string`,
  })

})

module.exports = { booksBorrowingValidator }