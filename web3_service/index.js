
const express = require('express');

var Web3 = require('web3');
const PORT = 2000
const app = express();
 
app.get('/', (req, res) => {
  let add= Web3.utils.toChecksumAddress(req.query.address)
  return res.json({'address':add})
});
 

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);