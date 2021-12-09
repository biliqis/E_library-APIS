
// const { body, params, query } = require('express-validator');
const Joi = require("joi");

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
const phoneNumberValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

const UserValidator = {};

UserValidator.createUserValidator = Joi.object().keys({
	firstName: Joi.string().trim().required().messages({
		'string.base': `"firstName" should be a type of 'text'`,
	}),

	lastName: Joi.string().trim().required().messages({
		'string.base': `"lastName" should be a type of 'text'`,
		'any.required': `"lastName" is a required field`,
	}),

    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
		'string.base': `"email" should be a type of 'email'`,
		'any.required': `"email" is a required field`,
	}),

     password: Joi.string().regex(strongPasswordRegex).trim().required().messages({
		'string.base': `"password must be strong". At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 in lenght'`,
		
		'any.required': `"password" is a required field`,
	}),


	phonenumber : Joi.string().regex(phoneNumberValidate).trim().required().messages({
		'string.base': `"phoneNumber" should be a type of 'text'`,
		'any.required': `"phoneNumber" is a required field`,
	}),

	role: Joi.string().trim().required().valid("admin", "user").messages({
		'string.base': `"role" should be a type of 'text'`,
		'any.required': `"role" is a required field`,
	}),



	address: Joi.string().trim().required().messages({
		'string.base': `"address" should be a type of 'text'`,
		'any.required': `"address" is a required field`,
	}),

});

UserValidator.loginUserValidator = Joi.object().keys({

	email: Joi.string().trim().optional().messages({
		'string.base': `"username" should be a type of 'text'`,
		'any.required': `"username" is a required field`,
	}),

	password: Joi.string().trim().required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'any.required': `"password" is a required field`,
	}),
});

UserValidator.editUserValidator = Joi.object().keys({
	lastName: Joi.string().trim().required().messages({
		'string.base': `"lastName" should be a type of 'text'`,
		'any.required': `"lastName" is a required field`,
	}),

	role: Joi.string().trim().required().valid("admin", "user").messages({
		'string.base': `"role" should be a type of 'text'`,
		'any.required': `"role" is a required field`,
	}),

	phonenumber: Joi.string().regex(phoneNumberValidate).trim().required().messages({
		'string.base': `"phoneNumber" should be a type of 'text'`,
		'any.required': `"phoneNumber" is a required field`,
	}),

	email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
		'string.base': `"email" should be a type of 'email'`,
		'any.required': `"email" is a required field`,
	}),

	address: Joi.string().trim().required().messages({
		'string.base': `"address" should be a type of 'text'`,
		'any.required': `"address" is a required field`,
	}),
	
	// password: Joi.string().regex(strongPasswordRegex).trim().required().messages({
	// 	'string.base': `"password must be strong". At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 in lenght'`,
	// 	'any.required': `"password" is a required field`,
	// }),


	// confirmPassword: Joi.string().regex(strongPasswordRegex).trim().required().messages({
	// 	'string.base': `"confirmPassword must be strong". At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum 8 in lenght'`,
	// 	'any.required': `"confirmPassword " is a required field`,
	// }),

});

module.exports = { UserValidator }

