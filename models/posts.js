module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define('Posts', {
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
<<<<<<< HEAD
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            }
        },
        modelName: 'Posts'
=======
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, { timestamps: true, versionKey: false, underscore: true });
>>>>>>> 66a0ecf3d57dd4476d566584c9465022d7728d9d

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