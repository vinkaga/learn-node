/**
 * Server module
 * @exports object (Hapi server)
 */

'use strict';
const config = require('../config');
const db = require('./model/index');
const logger = require('./util/logger');
const routes = require('./controller/index');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../package');

const server = module.exports = new Hapi.Server();
server.connection({ port: config.port });

server.register([
	Inert,
	Vision,
	{
		'register': HapiSwagger,
		'options': {
			info: {
				'title': Package.description,
				'version': Package.version,
			}
		}
	}
])
	.then(() => {
		server.route(routes);
		return db.sequelize.sync();
	})
	.then(() => {
		return server.start();
	})
	.then(() => {
		logger.warn('Server Restart: ' + server.info.uri + ' Env: ' + config.env);
	})
	.catch((err) => {
		logger.fatal(err);
	});
