let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


// User Api
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// movies Api
app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.movies`;
	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// movie cast Api
app.post('/api/getCast', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.movies
	INNER JOIN osellner.roles
	ON osellner.movies.id = osellner.roles.movie_id
	INNER JOIN osellner.actors
	ON osellner.actors.id = osellner.roles.actor_id
	WHERE osellner.movies.id = ?
	`;
	console.log(sql);
	let data = [req.body.moviesID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// search Api
app.post('/api/getSearch', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT DISTINCT  
	osellner.movies.name,
	GROUP_CONCAT(DISTINCT CONCAT(osellner.directors.first_name, " ", osellner.directors.last_name)) AS director_name,
	AVG(osellner.Review.reviewScore) AS averageScore
	FROM osellner.movies
	-- Join Actors  
	INNER JOIN osellner.roles
	ON osellner.movies.id = osellner.roles.movie_id
	INNER JOIN osellner.actors
	ON osellner.actors.id = osellner.roles.actor_id
	-- Join Directors
	INNER JOIN osellner.movies_directors
	ON osellner.movies.id = osellner.movies_directors.movie_id
	INNER JOIN osellner.directors
	ON osellner.directors.id = osellner.movies_directors.director_id
	-- Join Reviews
	LEFT JOIN osellner.Review
	ON osellner.movies.id = osellner.Review.moviesID`;
	let sqlWHERE = '';
	let data = [];

	if (req.body.enteredMovie) {
		if (sqlWHERE == '') {
			sqlWHERE += ' WHERE osellner.movies.name = ?'
		} else {
			sqlWHERE += ' AND osellner.movies.name = ?'
		}

		data.push(req.body.enteredMovie)
	}

	if (req.body.enteredActor) {
		if (sqlWHERE == '') {
			sqlWHERE += ' WHERE CONCAT(osellner.actors.first_name, " ", osellner.actors.last_name) = ?'
		} else {
			sqlWHERE += ' AND CONCAT(osellner.actors.first_name, " ", osellner.actors.last_name) = ?'
		}

		data.push(req.body.enteredActor)
	}

	if (req.body.enteredDirector) {
		if (sqlWHERE == '') {
			sqlWHERE += ' WHERE CONCAT(osellner.directors.first_name, " ", osellner.directors.last_name) = ?'
		} else {
			sqlWHERE += ' AND CONCAT(osellner.directors.first_name, " ", osellner.directors.last_name) = ?'
		}

		data.push(req.body.enteredDirector)
	}

	sql += sqlWHERE

	sql += ` GROUP BY osellner.movies.name
	ORDER BY osellner.movies.name`

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// getReviews Api
app.post('/api/getReviews', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM osellner.Review
	-- Join Reviews
	LEFT JOIN osellner.movies
	ON osellner.Review.moviesID = osellner.movies.id
	WHERE osellner.Review.reviewID IS NOT NULL`;

	console.log(sql);
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let obj = JSON.stringify(results);
		res.send({ express: obj });
	});
	connection.end();
});

// Review Api
app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO osellner.Review (reviewTitle, reviewContent, reviewScore, userID, moviesID) VALUES (?, ?, ?, ?, ?)`;
	let data = [req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore, req.body.userID, req.body.moviesID];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
