
const shortid = ()=>Math.random().toString(32).substr(2);
let DB = [];

//TODO: This should be replaced


module.exports = {

	connect : ()=>{},
	disconnect : ()=>{},

	create : (text, user)=>{
		const chirp = {
			id : shortid(),
			user, text,
			created_at : new Date(),
			updated_at : new Date()
		}
		DB.push(chirp);
		return chirp;
	},

	all : ()=>DB,

	getLatest : (count = undefined)=>{
		let res = DB.sort((a,b)=>a>b?1:-1)
		if(count) res= res.slice(0, count);
		return res;
	},

	getByUser : (userId)=>{
		return DB.filter(chirp=>chirp.user.sub == userId).sort((a,b)=>a>b?1:-1)
	},
}