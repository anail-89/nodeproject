module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(515),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, { timestamps: true, versionKey: false, underscore: true });

    return Posts;
};