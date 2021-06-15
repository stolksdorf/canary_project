const express = require('express');
const Router = express.Router();


const auth = require('./okta.auth.js').mw;

const MainPage = require('../client/main');
const AdminPage = require('../client/admin');

Router.get('/', (req, res)=>{
	return res.send(MainPage({
		user : req.user
	}));
});

Router.get('/admin', auth.adminOnly, (req, res)=>{
	return res.send(AdminPage({
		user : req.user
	}));
});

module.exports = Router;