const config = require('../config');

const express = require('express');
const server = express();

server.use(require('body-parser').json());
server.use(express.static(`${process.cwd()}/assets`));


server.get('/ping', (req, res)=> res.json({ pong : true, ts : Date.now() }));


server.use(require('./chirps/chirps.api.js'));

server.use(require('./page.router.js'));




server.use((err, req, res, next)=>{
	if(config.get('node_env') === 'production'){
		return res.status(500).send('Unexpected error.');
		console.error(err);
	}
	return res.status(500).send({
		message : err.message,
		stack : err.stack
	});
});

module.exports = server;