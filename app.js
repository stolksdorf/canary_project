const config = require('./config');

let Auth
try{
	Auth = require('./server/auth/okta.auth.js');
}catch(err){
	console.error(err);
	throw 'ERR: Okta is not configured. Get credientials from Scott.';
}



const express = require('express');
const app = express();

const PORT = config.get('port');
const run = async ()=>{
	await require('./server/chirps/chirps.db.js').connect();

	app.use(await Auth.router());
	app.use(require('./server/server.js'))

	app.listen(PORT, ()=>{
		console.log(`Canary Project running at PORT: ${PORT}`);
	});
}
run();
