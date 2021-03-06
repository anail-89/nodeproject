const { Sequelize } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test5', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

//  = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
//   host: env.DATABASE_HOST,
//   port: env.DATABASE_PORT,
//   dialect: env.DATABASE_DIALECT,
//   define: {
//     underscored: true
//   }
// });

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
//db.comments = require('../models/comments.js')(sequelize, Sequelize);
db.posts = require('../models/posts.js')(sequelize, Sequelize);

//Relations 
//db.comments.belongsTo(db.posts);
//db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users, {
    foreignKey: 'userId'
});
db.users.hasMany(db.posts, {
    // as: 'userPosts',
    foreignKey: 'userId'
});
db.users.associate(db);
db.posts.associate(db);
// Object.keys(db).forEach((modelName) => {
//     console.log(db[modelName]);
//     if (db[modelName].associate) {
//         console.log(db[modelName], 'associate');
//         db[modelName].associate(db);
//     }
// });

module.exports = db;