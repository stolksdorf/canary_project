const express = require('express');
const router = new express.Router();


const ChirpsDB = require('./chirps.db.js');


const wait = async (n,val)=>new Promise((r)=>setTimeout(()=>r(val), n));



const spec = require('./chirps.spec.js');
router.options('/api/chirps', (req, res)=>res.json(spec));


router.get('/api/chirps/user/:user_id', async (req, res)=>{
	return res.json(await ChirpsDB.getByUser(req.params.user_id));
});

router.get('/api/chirps/latest', async (req, res)=>{
	return res.json(await ChirpsDB.getLatest(req.query.count));
});


router.post('/api/chirps/create', async (req, res)=>{
	await wait(1200);

	if(!req.user) return res.status(401).send('Only users can create chirps');
	if(!req.body.text) return res.status(400).send('Chirp requires text');

	const newChirp = await ChirpsDB.create(req.body.text, req.user);

	return res.json(newChirp);
})


module.exports = router;