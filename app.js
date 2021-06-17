const config = require('./config');

//const Logs = require('./server/logs.mem.js');
//const Logs = require('./server/logs.db.js');

//TODO: Remove this

let Auth
try{
	Auth = require('./server/okta.auth.js');
}catch(err){
	console.error(err);
	throw 'ERR: Okta is not configured. Get credientials from Scott.';
}


const DatabaseConnect = require('./server/db.connect.js');

const express = require('express');
const app = express();


const PORT = config.get('port');
const run = async ()=>{
	await DatabaseConnect();
	app.use(await Auth.router());
	app.use(require('./server/server.js'))
	//await Logs.connect();

	app.listen(PORT, ()=>{
		console.log(`Canary Project running at PORT: ${PORT}`);
	});
}
run();
