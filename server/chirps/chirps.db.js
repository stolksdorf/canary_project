const config = require('../../config');
const ppg = require('pico-pg');
let DB;

const db_config = config.get('db');





//TODO: This needs to be cleaned up

const dbConnect = async ()=>{
	if(ppg.isConnected()) return;

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
};



const connect = async ()=>{
	await dbConnect();
	DB = await ppg.table('chirps');
};
const disconnect = async ()=>{
	if(!ppg.isConnected()) return;
	await ppg.disconnect();
	DB = null;
};



const create = async (text, user)=>{
	return await DB.add({
		text, user
	});
};

const all = async ()=>await DB.all()



const getLatest = async (count = undefined)=>{
	return await DB.all({
		limit : count,
		sort : {
			created_at : -1
		}
	})
};

const getByUser = async (user_id)=>{
	return await DB.find({
		user : {
			sub : user_id
		}
	},{
		sort : {
			created_at : -1
		}
	});
};

const deleteChirp = async (chirp_id)=>{
	return DB.removeById(chirp_id);
};

module.exports = {
	connect, disconnect,

	create,

	getLatest,
	getByUser,
	deleteChirp,

	all,
}


// if(!db_config.url && !db_config.port){ //TODO: add on a prod check
// 	module.exports = require('./chirps.mem.js');
// }