const Web3 = require('web3');
const {getSecret} = require('../secrets');

const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/d7d94f83e4bb4895b63568ba2e30811b');

console.log(web3.eth.accounts.create([getSecret('salt')]));
