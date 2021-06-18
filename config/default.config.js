module.exports = {
	port : 8000,
	host : 'http://localhost:8000',
	node_env : 'local',

	//Heads-up: The configs in 'client' will be sent client-side
	client : {

	},

	db : {
		//These should be overriden in your local.config.js file for dev

		// connectionString : ''

		// user             : '',
		// password         : '',
		// port             : 0,
	},

	//TODO: Populate this with a default Okta instances when we have one
	okta : {
		session_secret: 'set this to be very random',
		domain        : '',
		client_id     : '',
		client_secret : '',
		login_path    : '/login',
		logout_path   : '/logout',
	}
}