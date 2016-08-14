/**
 * Controller module
 * @exports array (of route objects)
 */

'use strict';
const config = require('../../config');

const routes = module.exports = [];

const controllers = [
	'item',
];

for (const controller of controllers) {
	routes.push(...(require('./' + controller)));
}
