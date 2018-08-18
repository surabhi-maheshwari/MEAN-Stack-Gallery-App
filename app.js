const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const cors = require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config = require('./config/database');

//connect to db stored in config file
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to db'+config.database);
})
//error
mongoose.connection.on('error',(err)=>{
    console.log(err);
})
const app= express();
const users= require('./routes/users');
const port = 3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.json());


//passport middleware for taking the tokens for authetication using jwt token. A Passport strategy for authenticating with a JSON Web Token.
//This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//use /users for all users routes 
app.use('/users', users);

//index route
app.get('/', (req,res)=>{
    res.send("invalid endpoint");
})
//so that all the routes navigate to index.html
app.get('*', (req, res)=>
{
    res.sendFile(path.join(__dirname,'public/index.html'));
});   
//server start
app.listen(port,()=>{
    console.log('server started on port'+port);
});
