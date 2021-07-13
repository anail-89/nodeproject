const express = require('express');
const router = express.Router();

router.route('/:id').get((req, res) => {
    res.end('GET method');
}).delete((req, res) => {
    res.end('DELETE method');
});
router.route('/').get((req, res) => {
    res.end('GET method');
}).post((req, res) => {
    res.end('POST method');
});




module.exports = router;