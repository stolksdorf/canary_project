
const run = async ()=>{
	const { Client } = require('pg')
	const client = new Client({
		user: 'postgres',
		//host: 'database.server.com',
		//database: 'mydb',
		password: '3edc!QAZ4rfv',
		port: 5432,
	});
	await client.connect()


	// const foo = await client.query(`CREATE TABLE student(id SERIAL PRIMARY KEY, firstname TEXT, lastname TEXT, age INT NOT NULL, address VARCHAR(255), email VARCHAR(50));`);

	// console.log(foo);


	// const res = await client.query(
	//   "INSERT INTO student(firstname, lastname, age, address, email)VALUES('Mary Ann', 'Wilters', 20, '74 S Westgate St', 'mroyster@royster.com')"
	// );


	const res = await client.query(``)

	console.log(res) // Hello world!

	await client.end()


}


run()

/*
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
client.connect()

*/