const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const usersRoutes = require('./src/routes/users.routes');
const moviesRoutes = require('./src/routes/movies.routes');

const app = express();

//usages
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());



// TOKEN AUTHENTICATION- ALL THE ROUTES WRITTEN BELOW THIS WILL NEED TOKEN TO BE SENT in request headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

//using routes
app.use('/api/users', usersRoutes);
app.use('/api/movies',moviesRoutes);

// LOCAL
var dburl = "mongodb://127.0.0.1:27017/moviesdb";

mongoose
  .connect(dburl,{ useUnifiedTopology: true, 

      useNewUrlParser:true, useCreateIndex: true,  useFindAndModify: false })
  .then(() => {
    console.log("Server has started.......")
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
