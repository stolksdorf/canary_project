const express = require('express');
const Router = express.Router();


const auth = require('./okta.auth.js').mw;


const Pages = require('../client/pages');



Router.get('/', (req, res)=>{
	return res.send(Pages.home({
		user : req.user
	}));
});


Router.get('/profile', (req, res)=>{
	if(!req.user) return res.status(401).send('Must be logged in to access your profile')
	return res.send(Pages.profile({
		user : req.user
	}));
});


Router.get('/admin', (req, res)=>{
	if(!req.user) return res.status(401).send('Must be logged in.');
	if(!req.user.groups.includes('admin')) return res.status(401).send('Must be an admin.');
	return res.send(Pages.admin({
		user : req.user
	}));
});


// Router.get('/admin', auth.adminOnly, (req, res)=>{
// 	return res.send(AdminPage({
// 		user : req.user
// 	}));
// });

module.exports = Router;