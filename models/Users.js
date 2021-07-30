module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        underscored: true,
        timestamps: true,
        modelName: 'Users'

    });
    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            foreignKey: 'userId',
            as: 'Posts'
        });
    }
    return Users;
}