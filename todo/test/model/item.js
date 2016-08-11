/**
 * Item model test
 */

'use strict';
process.env.NODE_ENV = 'test';
const db = require('../../src/model/index');
const Promise = require('bluebird');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const expect = Code.expect;
const fail = Code.fail;

const rec = { desc: 'a todo item', trans: 'translated item' };

describe("Models: Item", () => {

	before(() => {
		// Returning a promise is an alternative to 'done'
		return db.sequelize.sync({force: true}); // Clean DB
	});

	it('should create OK', () => {
		return db.item.create(rec).then(() => {
			db.item.find({where: {desc: rec.desc}}).then((item) => {
				expect(item.desc).to.equal(rec.desc);
			});
		});
	});

	it('should fail creating', () => {
		return Promise.all([
			db.item.create({desc: rec.desc}).then(() 			=> { fail('created with missing trans') }).catch((e) => {}),
			db.item.create({desc: rec.desc, trans: ''}).then(() => { fail('created with empty desc') }).catch((e) => {}),
			db.item.create({trans: rec.trans}).then(() 			=> { fail('created with missing desc') }).catch((e) => {}),
			db.item.create({desc: '', trans: rec.trans}).then(()=> { fail('created with empty desc') }).catch((e) => {}),
		]);
	});

});
