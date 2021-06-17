const config = require('../config');
const ppg = require('pico-pg');

const ChirpsDB = require('./chirps/chirps.db.js');


module.exports = async ()=>{
	const connectionString = config.get('DATABASE_URL', false);
	const localConfig = config.get('local_db', false);

	if(connectionString){
		await ppg.connect({ connectionString, ssl: { rejectUnauthorized: false }});
		console.log(`Database: Connected to ${connectionString}`);
	}else if(localConfig){
		await ppg.connect(localConfig);
		console.log(`Database: Connected to local db on post : ${localConfig.port}`);
	}else{
		console.log('Warning: No Database connected');
	}

	await ChirpsDB.connect();
};