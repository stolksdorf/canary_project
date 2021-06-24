const config = require('../../config');
const express = require('express');
const server = express();

/*TODO:
- Using the middleware completely is a bit overkill
- Espicailly when we need to design fallbacks in mind
- Research other methods of incorporating okta into the auth flow

- Set up a general auth module to include that will utilize either Okta or a fallback if okta creds aren't provided
- Custom login fallback page to select between pre-built persona accounts for local testing
-


*/


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
	if(req.userContext){
		req.user = req.userContext.userinfo;
		req.user.id = req.user.sub;
	}
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