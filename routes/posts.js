const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const users = require('../models/users');

router.route('/').get(async(req, res) => {
    const posts = await Posts.findAll({ include: 'author' });
    res.json(posts);
}).post(async(req, res) => {
    try {
        let post = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.userId

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