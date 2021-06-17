const config = require('../config');
const express = require('express');
const server = express();


const { ExpressOIDC } = require('@okta/oidc-middleware');
const oidc = new ExpressOIDC({
	issuer        : `https://${config.get('okta.domain')}/oauth2/default`,
	client_id     : config.get('okta.client_id'),
	client_secret : config.get('okta.client_secret'),
	appBaseUrl    : config.get('host'),
	scope         : 'openid profile email groups', //See readme to enable group scope
	testing       : {
		disableHttpsCheck : config.get('node_env') == 'local'
	},
	routes : {
		login : {
			path : config.get('okta.login_path')
		}
	}
});

server.use(require('express-session')({
	secret            : config.get('okta.session_secret'),
	resave            : true,
	saveUninitialized : false
}));


/* Routes */
server.use(oidc.router);
server.use((req, res, next)=>{
	if(req.userContext) req.user = req.userContext.userinfo;
	next();
});
server.get(config.get('okta.logout_path'), (req, res, next)=>{
	if(req.isAuthenticated()) return next();
	return res.redirect('/');
}, oidc.forceLogoutAndRevoke());


/* Middleware */
const mw = {};
mw.ensureGroups = (...groups)=>{
	return (req,res,next)=>{
		const hasGroups = !!req.user && !!req.user.groups;
		if(!hasGroups || !groups.every(g=>req.user.groups.includes(g))){
			return res.status(401).send('Unauthorized');
		}
		return next();
	}
};
mw.adminOnly = mw.ensureGroups('admin');
mw.ensureUser = oidc.ensureAuthenticated();


const router = new Promise((resolve, reject)=>{
	oidc.on('ready', ()=>resolve(server));
	oidc.on('error', (err)=>reject(err));
})

module.exports = {
	router : async ()=>router,
	mw,
};