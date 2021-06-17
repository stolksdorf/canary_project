const config = require('./config');

//const Logs = require('./server/logs.mem.js');
//const Logs = require('./server/logs.db.js');
const Auth = require('./server/okta.auth.js');


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
