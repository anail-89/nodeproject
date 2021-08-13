const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../config/db');

const { Users: usersModel } = require('../models');
const { Posts: postsModel } = require('../models');

router.route('/').get(async(req, res) => {


    const query = {
        include: [{
            model: usersModel,
            as: 'postsWithUsers'
        }]
    }
    return postsModel.findAll(query)
        .then(posts => {

            console.log(posts);
            console.log(posts);
            res.json(posts);
        })
        .catch(err => res.json(err.message));

}).post(async(req, res) => {
    try {
        let post = {
            title: req.body.title,
            description: req.body.description,
            author_id: req.body.author

        };
        await postsModel.create(post);
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