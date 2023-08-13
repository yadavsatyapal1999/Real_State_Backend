
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const propertyRouter = require("./routes/property");
const cors = require("cors");
const userRouter = require("./routes/user");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_DB).then(res=>{
    console.log("Connected to Database Successfully");
}).catch(err=>{
    console.log("Connection failed");
})


app.use("/prop",propertyRouter);
app.use("/user",userRouter);
app.listen(process.env.PORT);
/*


// Satyapal Code

const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const addproperty =  require('./Routes_Satyapal/property')
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(process.env.MONGO_DB).then(res=>{
    console.log("Connected to DB");
})
.catch(err=>{
    console.log("could not connect to DB");
})
app.use('/property',addproperty);

app.listen(process.env.PORT,()=>{
    console.log(`App is listening at ${process.env.PORT}`)
})
*/