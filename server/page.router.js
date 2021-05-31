const express = require('express');
const Router = express.Router();

const fs = require('fs')

const mw = require('./middleware.js');

const MainPage = require('../client/main');
const AdminPage = require('../client/admin');

Router.get('/', (req, res)=>{
	return res.send(MainPage());
});

Router.get('/admin', mw.auth, (req, res)=>{
	return res.send(AdminPage());
});

module.exports = Router;