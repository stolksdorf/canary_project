module.exports = {
	port : 8000,
	host : 'http://localhost:8000',


	auth : {
		scott : 'test'
	},
	client : {

	},
	okta : {
		session_secret: 'set this to be very random',
		domain        : '',
		client_id     : '',
		client_secret : '',
		login_path    : '/login',
		logout_path   : '/logout',
	}
}