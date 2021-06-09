const express = require('express');
const Axios = require('axios');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.get('/search/:query/:page', authenticate, async (req, res) => {
    Axios.get(`/search?q=${req.params.query}&type=things&sort=relevant&page=${req.params.page}`)
        .then((response) => {
            if (typeof (response.data) === "object") console.log(response.data);
            res.send(req.params);
        });
});

module.exports = router;
