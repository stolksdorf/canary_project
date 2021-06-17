module.exports = {
	port : 8000,
	host : 'http://localhost:8000',


	client : {

	},


	DATABASE_URL : false,
	// local_db : {
	// 	user     : '',
	// 	password : '',
	// 	port     : 0,
	// },


	//TODO: Populate this with a defualt Okta instances when we have one
	okta : {
		session_secret: 'set this to be very random',
		domain        : '',
		client_id     : '',
		client_secret : '',
		login_path    : '/login',
		logout_path   : '/logout',
	}
}