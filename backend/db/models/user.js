"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			const { id, email } = this; // context will be the User instance
			return { id, email };
		}
		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}
		static getCurrentUserById(id) {
			return User.scope("currentUser").findByPk(id);
		}
		static async login({ email, password }) {
			const user = await User.scope("loginUser").findOne({
				where: { email },
			});
			if (user && user.validatePassword(password)) {
				return await User.scope("currentUser").findByPk(user.id);
			}
		}
		static async signup({ email, password }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				email,
				hashedPassword,
			});
			return await User.scope("currentUser").findByPk(user.id);
		}
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: [
						"hashedPassword",
						"email",
						"createdAt",
						"updatedAt",
					],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
