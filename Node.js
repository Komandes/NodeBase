var mongo = require('mongodb'); 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://194.181.109.242/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});