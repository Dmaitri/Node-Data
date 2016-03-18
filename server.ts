﻿/* tslint:disable */
require('reflect-metadata/reflect');
import http = require("http");
import express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
import * as config from './config';
import {router} from './core/dynamic/dynamic-controller';

import * as data from './mongoose';
var Main = require('./core')(config, __dirname, data.entityServiceInst);
data.connect();
data.generateSchema();

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
var expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);
var server = http.createServer(app);
server.listen(23548);