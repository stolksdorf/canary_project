const ppg = require('pico-pg');
const config = require('../config')

let DB;

const connectionString = config.get('DATABASE_URL', false);

const connect = async ()=>{

	if(connectionString){
		await ppg.connect({ connectionString });
	}else{
		await ppg.connect(config.get('db'));
	}

	DB = await ppg.table('logs');
}

const create = async (data)=>{
	return await DB.add({
		ts: new Date(),
		...data
	});
};

const fetch = async ()=>{
	return await DB.all();
};

const update = async (id, data)=>{
	return await DB.update({
		id, ...data
	});
};

const remove = async (id)=>{
	return await DB.removeById(id);
};

module.exports = {
	connect,
	create,
	fetch,
	update,
	remove,
}