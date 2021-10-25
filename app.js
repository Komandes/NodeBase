const express = require('express');
const app = express();
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://Komandes:Izzykot123@Cluster0.1ajxq.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'hbs')
hbs.localsAsTemplateData(app);
app.use(express.urlencoded({extended: true }));

app.get("/", (req, res) =>{
  res.render('index');
});

app.post("/", (req,res) =>{
let studentObject = {'addressNumber': req.body.addressNumber, 'firstName': req.body.firstName, 'lastName': req.body.lastName}
  client.connect ( (err) => {
    const collection = client.db('mydb').collection("Uczniowie");
    collection.insertOne(studentObject, (err, res) =>{
      if(err)
        throw err;
        console.log("Student subbmited")
    
    });

  });
  client.close();
  app.locals.msg= "Subbmitned to the database"
  res.render('index')
});


app.get("/list", (req,res) => {
  client.connect( (err) => {
  const collection = client.db('mydb').collection('Uczniowie');
  collection.find().toArray((err, result) =>{
    app.locals.studentList = result;
    console.log(result);
    res.render("list");
    });
  });
});
app.listen(7754);