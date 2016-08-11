/**
 * Configuration module
 */

'use strict';
const env = process.env.NODE_ENV || 'development';
const configs = {
	development: {
		port: 3000,
		db: {
			name: 'todo-dev',
			username: 'root',
			password: 'mysql',
			dialect: 'mysql',
			host: 'localhost',
			port: 3306
		},
		translate: {
			url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			key: 'trnsl.1.1.20160805T143434Z.8ad64dde3d4eea98.6632d4e5d70a8856294dca911558615dd5ce1c4c',
			lang: 'es',
		},
		logger: {
			name: 'todo-dev',
			level: 'info',
			stream: process.stdout,
		},
	},
	test: {
		port: 3001,
		db: {
			name: 'todo-test',
			username: 'root',
			password: 'mysql',
			dialect: 'mysql',
			host: 'localhost',
			port: 3306
		},
		translate: {
			url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			key: 'trnsl.1.1.20160805T143434Z.8ad64dde3d4eea98.6632d4e5d70a8856294dca911558615dd5ce1c4c',
			lang: 'es',
		},
		logger: {
			name: 'todo-test',
			level: 'error',
			stream: process.stdout,
		},
	},
	production: {
		port: 80,
		db: {
			name: 'todo',
			username: 'root',
			password: 'mysql',
			dialect: 'mysql',
			host: 'localhost',
			port: 3306
		},
		translate: {
			url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			key: 'trnsl.1.1.20160805T143434Z.8ad64dde3d4eea98.6632d4e5d70a8856294dca911558615dd5ce1c4c',
			lang: 'es',
		},
		logger: {
			name: 'todo',
			streams: [{
				level: 'warn',
				type: 'rotating-file',
				path: 'todo.log',
				period: '1d',   // Daily rotation
				count: 7,       // Keep 1 week
			}]
		},
	},
};
let config = configs[env];
config.env = env;
module.exports = config;
