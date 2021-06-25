const config = require('../config');
let ppg = require('pico-pg');

module.exports = async ()=>{
	const db_config = config.get('db', false);
	const connectionString = config.get('DATABASE_URL', false);

	if(!db_config && !connectionString){
		if(config.get('node_env') !== 'local'){ throw 'No Postgres config. Can not start database.'}

		console.log('DEV: No Postgres config. Falling back to in-memory database.');
		ppg = require('pico-pg/memory');
	}

	if(db_config) await ppg.connect(db_config);
	if(connectionString) await ppg.connect({ connectionString });

	return ppg;
};