const express = require('express');
const server = express();

server.use(require('body-parser').json());
server.use(express.static(`${process.cwd()}/build`));
server.use(express.static(`${process.cwd()}/assets`));


server.get('/ping', (req, res)=> res.json({ pong : true, ts : Date.now() }));

server.use(require('./logs.api.js'));
server.use(require('./page.router.js'));


module.exports = server;