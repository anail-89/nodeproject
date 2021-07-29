const uuid = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.STRING,
            default: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true



    });
    // associate: (models) => {
    //     Users.hasMany(models.posts, {

    //         foreignKey: {
    //             name: 'uid',
    //             allowNull: false
    //         }
    //     });
    // }
    return Users;
}