const express = require('express');
const bodyParser = require('body-parser');

const cloneCtrl = require('./controllers/cloneCtrl');

const app = express();
const port = 4001;

app.use(bodyParser.json());

app.post('/clone', cloneCtrl.massClone);

app.listen(port, () => console.log('Backend running on => ' + port))