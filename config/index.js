const localDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'local';

module.exports = require('pico-conf')
	.file('./default.config.js', {})
	.file('./local.config.js', ()=>{
		if(localDev) console.log('INFO: Could not find local config file. You may want to set one up.');
		return {};
	})
	.env()
	.argv();