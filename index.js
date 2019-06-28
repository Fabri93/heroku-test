const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
mongoose.connect("mongodb+srv://dbUser:Matematica93@cluster0-gdac1.azure.mongodb.net/subscribers?retryWrites=true&w=majority" , { useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.error('Connected to Database'))

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

//Solve some CORS problem
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Create route /api
const routes = require('./routes/api');
app.use('/api', routes);

//Make possible parsing a json response
app.use(bodyParser.json());

//Create logging the error
app.use((err, req, res, next) => {
    console.log(err);
    next();
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});