'use strict'
// imports
import config from './config/config';

// server config
const mongoose = require('mongoose');
const port = process.env.PORT || config.PORT;
const app = require('./app');
// db connection
mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true })
        .then(() => {
                console.log('[SERVER] Connection to db photo-capture is correct');
                // create server
                app.listen(port, () => {
                        console.log(`[SERVER] Server running in port ${port}`);
                });
        })
        .catch((err: Error) => console.log(err))