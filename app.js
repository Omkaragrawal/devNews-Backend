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

let newestHackerNews = [];


const getNewestHackerNews = async () => {
    newestHackerNews = [];
    try {
        let { data } = await axios.get("https://hnrss.org/newest.jsonfeed", {
            responseType: 'json'
        });

        for (let news of data) {
            news.date_published = new Date(news.date_published).toLocaleString('en-GB', {
                timeZoneName: 'short',
                hc: 'h24',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
        newestHackerNews = Array.from(data);
    } catch (err) {
        debug(err);
        logger(err);
    }

}


getNewestHackerNews();





module.exports = {
    app,
    getNewestHackerNews,

};