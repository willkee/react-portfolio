"use strict";
const bcrypt = require("bcryptjs");
const { admin } = require("../../config");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: admin.email,
					hashedPassword: bcrypt.hashSync(admin.password),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Users", null, {});
	},
};
