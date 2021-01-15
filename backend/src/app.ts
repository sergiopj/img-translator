'use strict'

// express app config
import express from 'express';
const cors = require('cors');
const app: any = express();

// load routes
const fileRoutes = require('./routes/file.routes');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// cors and headers
app.use(cors());

// use routes
app.use('/', fileRoutes);

// export config
module.exports = app;