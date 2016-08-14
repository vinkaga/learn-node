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

const server = module.exports = new Hapi.Server();

server.connection({ port: config.port });
server.route(routes);

db.sequelize.sync()
	.then(function() {
		return server.start();
	})
	.then(function() {
		logger.warn('Server Restart: ' + server.info.uri);
	})
	.catch((err) => {
		logger.fatal(err);
	});
