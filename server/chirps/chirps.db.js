const config = require('../../config');
const ppg = require('pico-pg');

let Chirps;

const db_config = config.get('db');

//TODO" Move all of this to database.connect.js once the fallback on pico-pg is completed
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
	Chirps = await ppg.table('chirps');
};
const disconnect = async ()=>{
	if(!ppg.isConnected()) return;
	await ppg.disconnect();
	Chirps = null;
};



const create = async (text, user)=>{
	return await Chirps.add({
		text, user
	});
};

const all = async ()=>await Chirps.all()



const getLatest = async (count = undefined)=>{
	return await Chirps.all({
		limit : count,
		sort : {
			created_at : -1
		}
	})
};

const getByUser = async (user_id)=>{
	return await Chirps.find({
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
	return Chirps.removeById(chirp_id);
};

module.exports = {
	connect, disconnect,

	create,

	getLatest,
	getByUser,
	deleteChirp,

	all,
}
