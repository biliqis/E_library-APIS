const Joi = require("joi");

const BookApplicationValidator = {};

BookApplicationValidator.createBookApplicationValidator = Joi.object().keys({

  bookId: Joi.string().required().messages({
    "string.base": `"Book ID" should be of type 'string'`,
    "string.empty": `"Book ID" cannot be an empty string`,
  }),

  userId: Joi.string().optional().messages({
    "string.base": `"User ID" should be of type 'string'`,
    "string.empty": `"User ID" cannot be an empty string`,
  }),

  numberOfBooks: Joi.number().integer().default(1).messages({
    "string.base": `"Number of books" should be of type 'number'`,
    "string.empty": `"Number of books" cannot be an empty string`,
  }),
  
  appliedBooks: Joi.object().optional(),

  status: Joi.string().valid("pending", "approved", "returned").default('pending').optional(),

  borrowDate: Joi.date().default(Date.now()).messages({
    "string.base": `"Borrow date" should be of type 'date'`,
    "string.empty": `"Borrow date" cannot be an empty string`,
  }),

  username: Joi.string().optional(),

  returnDate: Joi.date().greater(Joi.ref('borrowDate')).messages({
    "string.base": `"Return date" should be of type 'number'`,
    "string.empty": `"Return date" cannot be an empty string`,
  })

})

module.exports = { BookApplicationValidator }