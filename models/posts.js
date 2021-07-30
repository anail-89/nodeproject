module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define('Posts', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            }
        },
        modelName: 'Posts'

    }, { tableName: 'posts', timestamps: true, underscore: true });
    Posts.associate = (models) => {
        console.log(models.users);
        console.log('jdsfhjdjfkdjfkd');
        Posts.belongsTo(models.Users, {
            as: 'Users',
            foreignKey: 'userId'
        });
    }
    return Posts;
};