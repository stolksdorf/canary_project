
const shortid = ()=>Math.random().toString(32).substr(2);

let Logs = [
	{
		id : shortid(),
		ts : Date.now(),
		msg : 'Oh hello'
	}
];

const connect = async ()=>{}

const create = async (data)=>{
	const newLog = {...data, id : shortid(), ts: Date.now()};
	Logs.push(newLog);
	return newLog;
};

const fetch = async ()=>{
	return Logs;
};

const update = async (id, data)=>{
	const idx = Logs.findIndex(item=>item.id == id);
	Logs[idx] = {...Logs[idx], ...data};
	return Logs[idx];
};

const remove = async (id)=>{
	const idx = Logs.findIndex(item=>item.id == id);
	Logs.splice(idx, 1);
};

module.exports = {
	connect,
	create,
	fetch,
	update,
	remove,
}