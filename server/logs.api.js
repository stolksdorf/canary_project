const express = require('express');
const Router = express.Router()

const mw = require('./middleware.js');

//const LogDB = require('./logs.mem.js');
const LogDB = require('./logs.db.js');


const wait = async (n,val)=>new Promise((r)=>setTimeout(()=>r(val), n));

Router.get('/api/logs', async (req, res)=>{
	//await wait(800);
	res.json(await LogDB.fetch());
});

Router.post('/api/logs', mw.auth, async (req, res)=>{
	//await wait(800);
	res.json(await LogDB.create(req.body));
});

Router.delete('/api/logs/:id', mw.auth, async (req, res)=>{
	//await wait(800);
	await LogDB.remove(req.params.id);
	return res.json({msg : 'ok', success : true});
});


module.exports = Router;