module.exports = require('pico-conf')
	.file('./default.config.js', {})
	.file('./local.config.js', ()=>console.log('Could not find local config file'))
	.env()
	.argv();