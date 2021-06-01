const config = require('./config');

//const Logs = require('./server/logs.mem.js');
const Logs = require('./server/logs.db.js');

const server = require('./server/server.js');



const PORT = config.get('port');
const run = async ()=>{
	await Logs.connect();
	server.listen(PORT, ()=>{
		console.log(`Server running at PORT: ${PORT}`);
	});
}

run();
