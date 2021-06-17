
const UserSchema = {

}


const ChirpSchema = {
	id : { type : 'uuid'},
	text : { type: 'string'},
	user : UserSchema,
	updated_at : { type : 'date-time'},
	created_at : { type : 'date-time'}

}


const createChirp = {
	'/api/chirps/create' : {
		post : {
			produces: [ "text/plain", "application/json", "text/json" ],
			parameters: [
				{
					name: "text",
					in: "body",
					required: true,
					schema: { type: "string" }
				},
			],
			responses : {

				401 : {
					description : "No user logged in",
				},
				400 : {
					description : "A Chirp requires text"
				},
				200 : {
					description : "Creates a new Chirp",
					schema: ChirpSchema
				}
			}
		}
	}
}

//  /pet/{petId}:



module.exports = {
	swagger: "2.0",
	info: {
		version: "1.0",
		title: "Chirps API",
		description: "Spec for just the Chrisp API on the Canary Project"
	},
	paths: {
		...createChirp
	}
}