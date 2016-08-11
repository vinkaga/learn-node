'use strict';
const server = require('../src/server.js');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe("Basic HTTP Tests", function() {
	it('should return simple server JSON', function() {
		return server.inject('/').then(function(res) {
			expect(res.statusCode).to.equal(200);
			expect(res.payload).to.equal('{"simple":"server"}');
		});
	});
});
