const config = require('../config');

const express = require('express');
const server = express();

server.use(require('body-parser').json());
server.use(express.static(`${process.cwd()}/build`));
server.use(express.static(`${process.cwd()}/assets`));

const Logs = require('./logs.mem.js');
//const Logs = require('./logs.db.js');

server.get('/ping', (req, res)=> res.json({ pong : true, ts : Date.now() }));



server.use(require('./logs.api.js'));
server.use(require('./page.router.js'));




const PORT = config.get('port');

module.exports = async ()=>{
	await Logs.connect();
	server.listen(PORT, ()=>{
		console.log(`Server running at PORT: ${PORT}`);
	});
}
