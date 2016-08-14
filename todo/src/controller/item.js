/**
 * Item controller module
 * @exports array (of route objects)
 */

'use strict';
const db = require('../model/index');
const translate = require('../util/translate');
const schema = require('../schema/item');
const Boom = require('boom');

const get = {
	method: 'GET',
	path: '/',
	config: {
		handler: (request, reply) => {
			db.item.findAll()
				.then((items) => {
					return reply(items.map((e) => (e.get())));
				})
				.catch((err) => {
					return reply(Boom.badImplementation(err));
				});
		},
		validate: schema.GET.validate,
		response: schema.GET.response,
	},
};

const post = {
	method: 'POST',
	path: '/',
	config: {
		handler: (request, reply) => {
			translate(request.payload)
				.then((trans) => {
					return db.item.create({
						desc: request.payload,
						trans: trans,
					});
				})
				.then((item) => {
					return reply('created').code(201);
				})
				.catch((err) => {
					return reply(Boom.badImplementation(err));
				});
		},
		validate: schema.POST.validate,
		response: schema.POST.response,
	},
};

const del = {
	method: 'DELETE',
	path: '/{id}',
	config: {
		handler: (request, reply) => {
			db.item.destroy({where: {id: request.params.id}})
				.then((rows) => {
					if (rows === 1) {
						return reply('success');
					}
					return reply(Boom.badRequest('Item doesn\'t exist'));
				})
				.catch((err) => {
					return reply(Boom.badImplementation(err));
				});
		},
		validate: schema.DELETE.validate,
		response: schema.DELETE.response,
	},
};

module.exports = [get, post, del];
