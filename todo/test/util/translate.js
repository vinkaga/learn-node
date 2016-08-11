/**
 * Item model test
 */

'use strict';
process.env.NODE_ENV = 'test';
const translate = require('../../src/util/translate');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const fail = Code.fail;

describe("Models: Item", () => {

	it('should translate', () => {
		return translate('hello').then((str) => {
			expect(str).to.equal('hola');
		});
	});

	it('should fail translating', () => {
		return translate('')
			.then((str) => {
				fail('Unexpected success');
			})
			.catch((e) => {});
	});

});
