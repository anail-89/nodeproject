const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../config/db');

const { Users: usersModel } = require('../models');
const { Posts: postsModel } = require('../models');


//const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
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
        const user = await usersModel.findByPk(req.body.author);

        if (!user) {
            throw new Error('User not found!');
        }
        let title = req.body.title;
        await postsModel.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${req.body.title}%`

                },
                author_id: [req.body.author]


            },
            order: [
                ['id', 'DESC']
            ],
            limit: 1
        }).then(async(post) => {
            //uxxel
            if (post.length > 0) {
                console.log(post[0].title);
                const regexp = new RegExp('\([1-9]\)', 'g');
                console.log(regexp);

                if (regexp.test(post[0].title.trim())) {

                    post[0].title.replace(regexp, post[0].title.charAt(post[0].title.length - 1));
                } else {
                    console.log('false');
                }

            } else {
                console.log('post chka');
            }

            title += '(1)';



        }).catch(e => console.log(e));
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