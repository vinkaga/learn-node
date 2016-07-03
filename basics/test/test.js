'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../src/server.js');

lab.experiment("Basic HTTP Tests", function() {
	lab.test('It will return simple server JSON', function(done) {
		server.inject('/', function(res) {
			Code.expect(res.statusCode).to.equal(200);
			Code.expect(res.payload).to.equal('{"simple":"server"}');
			done();
		});
	});
});
