/**
 * DB Models module
 * @exports object (containing other objects - DB models and DB instance)
 */

'use strict';
const config = require('../../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
	dialect: config.db.dialect,
	host: config.db.host,
	port: config.db.port,
	logging: false,
});

const db = module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize,
};

const models = [
	'item',
];

for (const model of models) {
	db[model] = sequelize.import(__dirname + '/' + model)
}

// Model associations if any
