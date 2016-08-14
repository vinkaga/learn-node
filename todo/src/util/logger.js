/**
 * Logger module
 * @exports object (logger)
 */

'use strict';
const config = require('../../config');
const bunyan = require('bunyan');

module.exports = bunyan.createLogger(config.logger);
