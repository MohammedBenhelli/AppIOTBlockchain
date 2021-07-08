const express = require('express');
const {authenticate} = require('../middleware/authenticate');

const router = express.Router();

router.post('/print', authenticate, async (req, res) => {
    res.send(req.ip)
});

module.exports = router;
