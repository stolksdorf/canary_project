const app = require('express')();

const request = require('supertest');


const ChirpsDB = require('../server/chirps/chirps.db.js');
const Server = require('../server/server.js');


//Use this to slip in users
app.use((req, res, next)=>{
	console.log('oh hello');
	next();
});

app.use(Server)


module.exports = {
	//TODO: Check for swagger spec

	setup : async (t)=>{
		await ChirpsDB.connect();

		//clear and add some random chirps
	},

	spec_exists : async (t)=>{
		return request(app)
			.options('/api/chirps')
			.expect(200)
			.then(({body})=>{
				t.is(body.swagger, "2.0");
			})
	},

	create : {
		no_auth : async (t)=>{
			return request(app)
				.post('/api/chirps/create')
				.expect(401)
		},
		no_text : async (t)=>{
			//TODO: figure out how to mock Okta
			t.fail()
		},
		chirp : async (t)=>{
			t.fail()
		}
	}

}