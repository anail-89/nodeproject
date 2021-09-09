const { Users: usersModel } = require('../models');
const bcrypt = require('../managers/bcrypt');
const { sequelize, Sequelize } = require('../config/db');
const Users = require('../models/users')(sequelize, Sequelize);
const Op = Sequelize.Op;
const AppError = require('../managers/app-error');

class Auth {
    async login(data) {
        console.log(data);
        const user = await usersModel.findOne({
            where: {
                username: {
                    [Op.like]: `%${data.username}%`
                },
                password: data.password

            }
        });
        // console.log(user !== null);
        // console.log(user.length > 0);
        // console.log(typeof(user.dataValues) !== undefined);
        // console.log(typeof(user.dataValues) !== 'undefined');
        // console.log(user.dataValues.length > 0);
        // console.log(user.dataValues);
        if (user !== null && typeof(user.dataValues) !== undefined) {
            return user.dataValues;
        } else {
            return false;
        }
        return true;
        return user.dataValues && typeof(user.dataValues) !== undefined && user.dataValues.length > 0 ? user : false;



    }
    registration(data) {

    }
}
module.exports = new Auth();