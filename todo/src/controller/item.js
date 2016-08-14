/**
 * Item controller module
 * @exports array (of route objects)
 */

'use strict';
const db = require('../model/index');
const translate = require('../util/translate');
const Boom = require('boom');

const get = {
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		db.item.findAll()
			.then((items) => {
				return reply(items.map((e) => (e.get())));
			})
			.catch((err) => {
				return reply(Boom.badImplementation(err));
			});
	},
};

const post = {
	method: 'POST',
	path: '/',
	handler: (request, reply) => {
		if (!request.payload) {
			return reply(Boom.badRequest('Item is required'));
		}
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
};

const del = {
	method: 'DELETE',
	path: '/{id}',
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
};

module.exports = [get, post, del];
