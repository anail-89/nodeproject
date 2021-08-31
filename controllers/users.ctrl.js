const Users = require('../models/users');
class UsersCtrl {
    getById() {

    }
    getByAll() {

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