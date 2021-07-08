const proxy = require('express-http-proxy');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const {getSecret} = require('./secrets');
const usersRoute = require('./routes/users');
const logsRoute = require('./routes/logs');

mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri')).then(
    () => {
        console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
);

const app = express();
const port = process.env.PORT || 8000;

app.set('trust proxy', true);

app.use('/search', proxy('www.thingiverse.com'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', usersRoute);
app.use('/api/logs', logsRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = {app};
