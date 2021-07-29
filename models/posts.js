const uuid = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // defaultValue: DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //     model: 'users',
            //     key: 'id',
            // }
        }

    }, { timestamps: true, versionKey: false, underscore: true });

    return Posts;
};