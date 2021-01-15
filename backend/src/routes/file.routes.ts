'use strict'

import * as express from 'express';
const app = express.Router();
const fs = require('fs');


// controllers
const TranslatorController = require('../controllers/translator.controller');



/* ROUTES */
app.post('/transtale', TranslatorController.transtaleText);

app.get('/home', (req: any, res: express.Response) => {

    res.send('Hello');

});


module.exports = app;