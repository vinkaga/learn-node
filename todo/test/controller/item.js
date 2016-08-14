/**
 * Item controller test
 */

'use strict';
process.env.NODE_ENV = 'test';
const db = require('../../src/model/index');
const server = require('../../src/server');

const Promise = require('bluebird');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const expect = Code.expect;
const fail = Code.fail;

describe("Controllers: Item", () => {

	before(() => {
		return db.sequelize.sync({force: true}); // Clean DB
	});

	it('should GET/POST/DELETE OK', () => {
		return server.inject('/')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.result.length).to.equal(0);
				return server.inject({
					method: 'POST',
					url: '/',
					payload: '"hello first"',
				});
			})
			.then((res) => {
				expect(res.statusCode).to.equal(201);
				return server.inject({
					method: 'POST',
					url: '/',
					payload: '"hello second"',
				});
			})
			.then((res) => {
				expect(res.statusCode).to.equal(201);
				return server.inject('/');
			})
			.then(function(res) {
				expect(res.result.length).to.equal(2);
				return server.inject({
					method: 'DELETE',
					url: '/1',
				});
			})
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				return server.inject('/');
			})
			.then(function(res) {
				expect(res.result.length).to.equal(1);
				expect(res.result[0].desc).to.equal('hello second');
			});
	});

	it('should fail', () => {
		return Promise.all([
			server.inject({
				method: 'PUT',
				url: '/',
				payload: '"hello first"',
			}).then((r) => { if (r.statusCode != 404) fail('PUT should have failed'); }),
			server.inject({
				method: 'GET',
				url: '/1',
			}).then((r) => { if (r.statusCode != 404) fail('GET /1 should have failed'); }),
			server.inject({
				method: 'DELETE',
				url: '/100',
			}).then((r) => { if (r.statusCode != 400) fail('DELETE /100 should have failed'); }),
		]);
	});

});
