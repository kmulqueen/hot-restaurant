// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var reservations = [];
var waitList = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitList);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});


//mysql starts here!
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "hot_restaurants"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // connection.end();
});

connection.query("SELECT count(*) AS count FROM reservations", function (err, res) {
  if (err) throw err;
  var resTableLength = (res[0].count);
  if (resTableLength < 6) {
    app.post("/api/reservations", function (req, res) {
      var newReservation = req.body;
      connection.query("INSERT INTO reservations SET ?", newReservation, function(err, res) {
        if (err) throw err;
        console.log("added reservation");
      })
      newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
      console.log(newReservation);
      reservations.push(newReservation);
      res.json(newReservation);
    });
  } else {
    app.post("/api/waitlist", function (req, res) {
      var newReservation = req.body;
      connection.query("INSERT INTO wait_list SET ?", newReservation, function(err, res) {
        if (err) throw err;
        console.log("added reservation to wait list");
      })
      newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
      console.log(newReservation);
      reservations.push(newReservation);
      res.json(newReservation);
    });
  }
})