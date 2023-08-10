const express = require("express");
const User = require("../model/user");
const userRouter = express.Router();
require('dotenv').config();


userRouter.post("/v1/register",(req,res)=>{

})


userRouter.post("/v1/login",(req,res)=>{
    
})

module.exports = userRouter;
