const express = require('express');
const {authenticate} = require('../middleware/authenticate');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const rawABI = fs.readFileSync(path.resolve(__dirname, 'PrintGo.json')).toString();

const router = express.Router();
const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/d7d94f83e4bb4895b63568ba2e30811b');

const PrintGo = new web3.eth.Contract(JSON.parse(rawABI).abi, '0x00C9eB497cc20D66b7586726130eDE498478d831');

router.post('/print', authenticate, async (req, res) => {
    console.log(PrintGo)
    res.send(req.ip)
});

module.exports = router;
