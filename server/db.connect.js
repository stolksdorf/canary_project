const config = require('../config');
let ppg = require('pico-pg');

module.exports = async ()=>{
	let db_config = config.get('db', false);

	console.log('db_config', db_config);

	db_config.connectionString = db_config.connectionstring;

	if(!db_config){
		if(config.get('node_env') !== 'local'){ throw 'No Postgres config. Can not start database.'}

		console.log('DEV: No Postgres config. Falling back to in-memory database.');
		ppg = require('pico-pg/memory');
	}

	await ppg.connect(db_config);
	return ppg;
};