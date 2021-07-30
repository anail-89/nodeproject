const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../config/db');

const Users = require('../models/users');
const Posts = require('../models/posts')(sequelize, Sequelize);
const users = require('../models/users')(sequelize, Sequelize);

router.route('/').get(async(req, res) => {

    const posts = await Posts.findAll({ include: [{ model: users, as: 'usersPosts' }] }).catch(err => res.json(err.message));
    console.log(posts);
    res.json(posts);
}).post(async(req, res) => {
    try {
        let post = {
            title: req.body.title,
            description: req.body.description,
            userId: req.body.author

        };
        await Posts.create(post);
        res.json({ success: true, data: JSON.stringify(post), message: 'Post successfully created' });
    } catch (err) {
        res.json({ success: false, data: null, message: err.message });
    }
});
router.route('/:id').get((req, res) => {
    res.end('GET method');
}).delete((req, res) => {
    res.end('DELETE method');
});





module.exports = router;