const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../config/db');

const { Users: usersModel } = require('../models');
const { Posts: postsModel } = require('../models');

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

            res.json(posts);
        })
        .catch(err => res.json(err.message));

}).post(async(req, res) => {
    try {
        const user = await usersModel.findByPk(req.body.author);

        if (!user) {
            throw new Error('User not exists!');
        }
        let title = req.body.title;

        //find posts like a new post
        const regexp = new RegExp('\([1-9]\)', 'g');
        const where = regexp.test(title.trim()) ? `%${title.slice(0,title.trim().length-3)}%` : title;

        await postsModel.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${where}%`
                },
                author_id: [req.body.author]

            },
            order: [
                ['id', 'DESC']
            ],
            limit: 1
        }).then(async(post) => {

            if (post.length > 0) {

                const regexp = new RegExp('\([1-9]\)', 'g');

                if (regexp.test(post[0].title.trim())) {
                    let newValue = +post[0].title.trim().charAt(post[0].title.length - 2) + 1;
                    title = post[0].title.trim().slice(0, post[0].title.trim().length - 2) + newValue + ')';
                } else {
                    title = post[0].title.trim() + '(1)';
                }

            }

        }).catch(e => console.log(e));
        let post = {
            title: title,
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