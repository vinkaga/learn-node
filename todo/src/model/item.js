/**
 * Item model
 */

'use strict';

/**
 * Define model item
 * @param sequelize
 * @param DataTypes
 * @returns {Model}
 */
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('item', {
		desc: {
			type: DataTypes.STRING(256),
			validate: {
				len: [1, 256],
			},
		},
		trans: {
			type: DataTypes.STRING(256),
			validate: {
				len: [1, 256],
			},
		},
	});
};
