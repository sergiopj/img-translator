'use strict';
// server config
var config = require('./config/config');
var mongoose = require('mongoose');
// custom express config
var port = process.env.PROT || 3000;
// db connection
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUri)
    .then(function () {
    var app = require('./app');
    console.log('[SERVER] Connection to db multi-converter is ok!');
    // create server
    app.listen(port, function () {
        console.log("[SERVER] Server running in port " + port);
    });
})
    .catch(function (err) { return console.log(err); });
