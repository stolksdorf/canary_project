const config = require('../config');

const ppg = require('pico-pg');
const ChirpsDB = require('../server/chirps/chirps.db.js');

const pluck = (arr)=>arr[Math.floor(Math.random()*arr.length)];
const times = (n,fn)=>Array.from(new Array(n*1),(v,i)=>fn(i));


const FakeUsers = [
	{
		sub                : "24e0f651dc014165984c",
		email              : "carole.barnes@example.com",
		preferred_username : "carole.barnes@example.com",
		groups             : ["Everyone", "user"],
		family_name        : "Barnes",
		given_name         : "Carole",
		name               : "Carole Barnes",
	},
	{
		sub                : "d7b0453baaf24eef8b52",
		email              : "jimmie.mendoza@example.com",
		preferred_username : "jimmie.mendoza@example.com",
		groups             : ["Everyone", "user"],
		family_name        : "Mendoza",
		given_name         : "Jimmie",
		name               : "Jimmie Mendoza",
	}
];


const FakeContent = [
	`I am but a single chirp amongst the void.`
];


const run = async ()=>{
	await ChirpsDB.connect();

	await Promise.all(times(10, ()=>ChirpsDB.create(pluck(FakeContent), pluck(FakeUsers))));
	console.log('Created 10 random chirps')

	console.log(await ChirpsDB.all());

	await ChirpsDB.disconnect();
}
run();
