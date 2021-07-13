const express = require('express');
const router = express.Router();
var multer = require('multer');
const mimeType = require('mime-types');
const fs = require('fs').promises;
const path = require('path');
const usersJsonPath = path.join(__homedir, './users.json');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType.extension(file.mimetype));
    }
});

var upload = multer({ storage: storage })
    //var upload = multer({ dest: 'uploads/' });


router.route('/').get(async(req, res) => {
    console.log('users router');
    let users = Object.values(JSON.parse(await fs.readFile(usersJsonPath, 'utf-8')));
    if (req.query.name) {
        users = users.filter(user => user.name.includes(req.query.name));
    }
    if (req.query.limit) {
        users = users.slice(0, req.query.limit);
    }
    if (users.length > 0) {
        res.json({ success: true, data: users });
    } else {
        res.json({ success: false, message: 'Users not found' });
    }

    //const now = new Date();
    //res.end('Mehod ' + req.method + now.getHours() + " " + now.getMinutes());
}).post(upload.single('image'), async(req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(usersJsonPath), 'utf-8');
        if (data && data[req.body.username]) {
            // await fs.unlink(usersJsonPath);
            throw new Error('User exists');

        } else {
            data[req.body.username] = { username: req.body.username, 'name': req.body.name, 'path': req.file.path };

            fs.writeFile(usersJsonPath, JSON.stringify(data));
            res.json({ status: 'user created', data: JSON.stringify(data) });
        }
    } catch (err) {
        res.json({ success: false, data: null, message: err.message });
    }


    //const usersData = require('../users.json'); res.json({ status: true, data: req.body });
    //res.end('ok');
    // const now = new Date();
    // console.log(req.body);
    // console.log(req.middleware);
    // console.log(req.file);
    // console.log(req.body.name);
    // res.end('Create new User');
});

router.route('/:username').get(async(req, res) => {
    //res.end(JSON.stringify(req.params));
    const usersData = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
    if (usersData[req.params.username]) {
        res.json({
            success: true,
            data: usersData[req.params.username]
        });
    } else {
        res.json({ success: false, data: null, message: 'User not exists!' });
    }
}).put(upload.single('image'), async(req, res) => {
    try {

        const usersData = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
        console.log(path.join(__homedir, usersData[req.body.username]['path']));
        if (usersData[req.body.username]) {
            // await fs.unlink(path.join(__homedir, usersData[req.body.username]['path']));
            usersData[req.body.username]['path'] = req.file.path;
            usersData[req.body.username]['name'] = req.body.name;

            await fs.writeFile(usersJsonPath, JSON.stringify(usersData));
            res.json({
                success: true,
                message: 'User successfully updated!'
            });
        } else {
            throw new Error('User not found!');
        }
    } catch (e) {
        res.json({ success: false, data: null, message: e.message });
    }
}).delete(async(req, res) => {
    try {
        const usersData = JSON.parse(await fs.readFile(usersJsonPath, 'utf-8'));
        if (usersData[req.params.username]) {

            await delete usersData[req.params.username];
            await fs.writeFile(usersJsonPath, JSON.stringify(usersData));

            res.json({
                success: true,
                message: 'User successfully deleted!'
            });
        } else {
            throw new Error('User not found!');
        }

    } catch (e) {
        res.json({ success: false, data: null, message: e.message });
    }
});

module.exports = router;