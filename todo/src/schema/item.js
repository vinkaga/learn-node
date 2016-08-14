/**
 * Item schema module
 * @exports object (of schema objects)
 */

'use strict';
const config = require('../../config');
const Joi = require('joi');

module.exports.GET = {
	response: Object.assign({
		schema: Joi.array().items(Joi.object({
			id: Joi.number().integer().required(),
			desc: Joi.string().required(),
			trans: Joi.string().required(),
			createdAt: Joi.date().required(),
			updatedAt: Joi.date().required(),
		})),
	}, config.response),
};

module.exports.POST = {
	validate: {
		payload: Joi.string().min(1).max(256),
	},
};

module.exports.DELETE = {
	validate: {
		params: {
			id: Joi.number().integer().min(1),
		},
	},
};
