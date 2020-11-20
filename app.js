
const express = require ('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const productActions = require('./actions')
const app = express()

app.use(bodyParser.json())

app.use('/', productActions)

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });
 
mongoose
  .connect(
    'mongodb+srv://akshay:pp3z2hdwUL5ybDG@cluster0.j3qmy.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
