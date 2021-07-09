const express = require('express');

const nodeCron = require('node-cron');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const path = require('path');
const logger = require('morgan');
const debug = require('debug')('devNews-backend:server')
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(compression());
app.use(helmet());

module.exports = app;