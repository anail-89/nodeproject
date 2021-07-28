const express = require('express');
const router = express.Router();
const multer = require('multer');
const mimeType = require('mime-types');
const fs = require('fs').promises;
const path = require('path');
const usersJsonPath = path.join(__homedir, './users.json');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType.extension(file.mimetype));
    }
});

let upload = multer({ storage: storage })

const Users = require('../models/users');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

router.route('/').get(async(req, res) => {

    if (req.query.name || req.query.username || req.query.limit) {

        let options = {};

        options.where = {};
        options.attributes = {};
        options.attributes = ['name', 'username'];

        if (req.query.limit) {
            options.limit = {};
            options.limit = Number(req.query.limit);
        }
        if (req.query.name) {
            options.where.name = {
                [Op.iLike]: `%${req.query.name}%`
            }
        }
        if (req.query.username) {
            options.where.username = {
                [Op.iLike]: `%${req.query.username}%`
            }
        }

        await Users.findAll(options).then(users => {

            res.json({ success: true, data: users });

        }).catch(err => res.json(err));


    } else {
        await Users.findAll().then(users => {
            res.json({ success: true, data: users });
        }).catch(err => res.json({ success: false, message: 'Users not found' }));

    }


}).post(upload.single('image'), async(req, res) => {
    try {

        await Users.findAll({
            where: {
                username: {
                    [Op.like]: `%${req.body.username}%`
                }
            }
        }).then(async users => {
            if (users.length > 0) {
                res.json({ success: false, data: null, message: 'User exists' })

            } else {
                let user = {
                    name: req.body.name,
                    username: req.body.username,
                    path: req.file.path,
                    password: req.body.password,
                    email: req.body.email,
                    isActive: true

                };
                await Users.create(user);
                await delete user.password;
                res.json({ success: true, data: JSON.stringify(user), message: 'User successfully created' });

            }
        }).catch(err => res.json({ success: false, data: null, message: err.message }));

    } catch (err) {
        res.json({ success: false, data: null, message: err.message });
    }

});

router.route('/:username').get(async(req, res) => {
    console.log(req.params.username);
    if (req.params && req.params.username) {
        await Users.findOne({ where: { username: req.params.username } }).then(user => {
            if (user) {
                res.json({
                    success: true,
                    data: user
                });
            } else {
                throw new Error('User not found');
            }


        }).catch(err => res.json({ success: false, data: null, message: 'User not exists!' }));
    } else {
        res.json({ success: false, data: null, message: 'User not exists!' })
    }

}).put(upload.single('image'), async(req, res) => {
    try {
        if (req.body && req.body.username) {
            await Users.findOne({ where: { username: req.params.username } }).then(user => {
                user.path = req.file.path;
                user.name = req.body.name;
                // await fs.unlink(path.join(__homedir, user.path));
                Users.update(user, { where: { username: req.params.username } });
                res.json({
                    success: true,
                    message: 'User successfully updated!',
                    data: user
                });

            }).catch(err => res.json({ success: false, data: null, message: 'User not exists!' }));
        } else {
            throw new Error('User not found!');
        }

    } catch (e) {
        res.json({ success: false, data: null, message: e.message });
    }
}).delete(async(req, res) => {
    try {
        if (req.params && req.params.username) {
            Users.destroy({ where: { username: req.params.username } }).then(() => res.json({
                success: true,
                message: 'User successfully deleted!'
            })).catch(err =>
                res.json({ success: false, data: null, message: 'User not exists!' }));

        } else {
            throw new Error('User not found!');
        }

    } catch (e) {
        res.json({ success: false, data: null, message: e.message });
    }
});

module.exports = router;