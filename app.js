require('./config');

const server = require('./server/server.js');

server()
	.catch((err)=>console.error(err));