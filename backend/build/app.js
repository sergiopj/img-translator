'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express app config
var express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express_1.default();
// load routes
var fileRoutes = require('./routes/file.routes');
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
// conver req to json
app.use(bodyParser.json());
// cors and headers
app.use(cors());
// use routes
app.use('/', fileRoutes);
// export config
module.exports = app;
