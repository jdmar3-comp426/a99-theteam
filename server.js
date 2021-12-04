// Define app using express
var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./database.js");
// Require md5 MODULE
var md5 = require("md5");

//require Sessions module

var session = require('express-session');

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getDateTime(){
	let date = new Date(Date.now())
	return `date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes():  date.getMinutes()}`
}

// Set server port
var HTTP_PORT = 3000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	cookie : {secure : false, maxAge: 100000000},

}))

app.get('/', function(req, res){
	// console.log(req.session.user)
	if(req.session.user){
		// console.log(req.session.user)
		res.sendFile(__dirname + '/views/home.html')
	}else{
		res.sendFile(__dirname + '/views/homestarter.html')
	}

})

app.use(express.static('views'));

app.post('/login', function (req, res){
	let username = req.body.username
	let password = req.body.password

	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?")
	const out = stmt.get(username, md5(password))

	if(out != undefined){
		req.session.regenerate( function() {
			req.session.user = out
			const stmt = db.prepare("INSERT INTO login_history (user_id, datetime) VALUES (?, ?)");
			const info = stmt.run(out["id"], getDateTime());
			res.redirect('/')
			
		})
		

	}else{
		res.sendFile(__dirname + "/views/failed_login.html")
	}
	
})

app.post('/create_account', function (req, res){
	let username = req.body.username
	let password = md5(req.body.password)
	
	const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
	const info = stmt.run(username, password);

	session.user = info.lastInsertRowid
	res.redirect('/')
})

app.get('/logout', function (req, res){
	req.session.destroy(function(){
		res.redirect('/')

	})
})


app.get('/index', function (req, res){
	if(req.session.user){
		res.sendFile(__dirname + "/views/index.html")
	}else{
		res.redirect('/')
	}
})

app.get('/profile', function (req, res){
	if(req.session.user){
		res.sendFile(__dirname + "/views/profile.html")
	}else{
		res.redirect('/')
	}
	
})

app.get('/leaderboard', function (req, res){
	if(req.session.user){
		res.sendFile(__dirname + "/views/leaderboard.html")
	}else{
		res.redirect('/')
	}
	
})

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3

app.post("/app/new/score", (req, res) => {
	const stmt = db.prepare("INSERT INTO scores (user_id, score, datetime) VALUES (?, ?, ?)");
	const info = stmt.run(req.body.user_id, req.body.score, getDateTime());
	res.status(201).json({"message" : info.changes + " record created: ID " + info.lastInsertRowid + " (201)"});
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get('/app/user/:id', (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE id=?");
	const out = stmt.get(req.params.id)
	res.status(200).json(out);
});
// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id/", (req, res) => {
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?");
	const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
	res.status(200).json({"message" : info.changes + " record updated: ID " + req.params.id + " (200)"});
});
// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
	const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?");
	const info = stmt.run(req.params.id);
	res.status(200).json({"message" : info.changes+ " record deleted: ID " + req.params.id + " (200)"});
});

app.get('/app/user/', (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE id=?");
	const out = stmt.get(req.session.user["id"]);
	res.status(200).json(out);
});

app.get('/app/scores', (req, res) => {
	const stmt = db.prepare("SELECT scores.id, user_id, score, datetime, user FROM scores, userinfo WHERE scores.user_id=userinfo.id ORDER BY score LIMIT 5").all()
	res.status(200).json(stmt);
})

app.get('/app/userscores', (req, res) => {	
	const stmt = db.prepare("SELECT * FROM scores WHERE user_id = ?").all(req.session.user["id"]);
	res.status(200).json(stmt);
});
