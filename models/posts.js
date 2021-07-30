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
            // references: {
            //     model: 'users',
            //     key: 'id',
            // }
        }

    }, { tableName: 'posts', timestamps: true, underscore: true });
    associate: (models) => {
        Posts.belongsTo(models.users, { as: 'userPosts' });
    }
    return Posts;
};