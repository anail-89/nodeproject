const { Users: usersModel } = require('../models');
class UsersCtrl {
    async getById(userId) {
        const user = await usersModel.findByPk(userId);
        return user;
    }
    getAll(data) {
        if (data.name || data.username || data.limit) {

            let options = {};

            options.where = {};
            options.attributes = {};
            options.attributes = ['name', 'username'];
            options.include = [{
                model: postsModel,
                as: 'userPosts',
                // limit: 10,
                attributes: ['id', 'title', 'description'],
                order: [
                    ['id', 'DESC']
                ]
            }];
            if (data.limit) {
                options.limit = {};
                options.limit = Number(data.limit);
            }
            if (data.name) {
                options.where.name = {
                    [Op.iLike]: `%${data.name}%`
                }
            }
            if (data.username) {
                options.where.username = {
                    [Op.iLike]: `%${data.username}%`
                }
            }

            return usersModel.findAll(options);

        } else {
            return usersModel.findAll();

        }
    }
    async add(data) {
        await Users.findAll({
            where: {
                username: {
                    [Op.like]: `%${data.username}%`
                }
            }
        }).then(async users => {
            if (users.length > 0) {
                res.json({ success: false, data: null, message: 'User exists' })

            } else {
                //console.log(req.file);
                let user = {
                    name: data.name,
                    username: data.username,
                    path: data.file.path,
                    password: data.password,
                    email: data.email,
                    isActive: true

                };
                return Users.create(user);
                // await delete user.password;


            }
        }).catch(err => res.json({ success: false, data: null, message: err.message }));

    }
    update() {

    }
    delete() {

    }
}
module.exports = new UsersCtrl();