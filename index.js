const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://dbUser:Matematica93@cluster0-gdac1.azure.mongodb.net/subscribers?retryWrites=true&w=majority" , { useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.error('Connected to Database'))

//Solve some CORS problem
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Create route /subscribers
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

//Create root route
app.use((req, res, next) => {
  res.send('Welcome to Express');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});