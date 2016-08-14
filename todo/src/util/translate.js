/**
 * Translation module
 * @exports function (translate function)
 */

'use strict';
const config = require('../../config');
const Promise = require('bluebird');

const request = require('request-promise').defaults({
	uri: config.translate.url,
	qs: {
		key: config.translate.key,
		lang: config.translate.lang,
	},
	json: true,
});

/**
 * Translate a string
 * @param input string
 * @returns Promise (resolves to translated string)
 */
module.exports = (input) => {
	if (!input || typeof input !== 'string') {
		return Promise.reject('Invalid input');
	}
	return request.get({
		qs: { text: input },
	}).then((body) => {
		if (typeof body.text === 'object' && body.text instanceof Array) {
			return Promise.resolve(body.text[0]);
		}
		return Promise.reject('Invalid service response');
	});
};
