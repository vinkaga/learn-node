/**
 * DB Models module
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

const models = {
	Sequelize: Sequelize,
	sequelize: sequelize,
};
module.exports = models;

const names = [
	'item',
];

for (let name of names) {
	models[name] = sequelize.import(__dirname + '/' + name)
}

// Model associations if any