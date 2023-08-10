const express = require("express");
const User = require("../model/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config();


userRouter.post("/v1/register",(req,res)=>{
    const {email,password} = req.body;
    
    bcrypt.hash(password,10).then(hashPass=>{
        const userData = new User({
            email,
            password : hashPass
        })
        userData.save().then(result=>{
            res.status(200).json({
                message : "User Created successfully!!",
                data: result
            })
        }).catch(err=>{
            res.status(400).json({
                message: "Email already exist!!",
                errDesc : err
            })
        })
    }).catch(err=>{
        res.status(500).json({
            message: "Internal Server Error!!"
        })
    })


})


userRouter.post("/v1/login",(req,res)=>{
    const loginCred = req.body;
    User.findOne({email:loginCred.email}).then(user=>{
        if(user){
            bcrypt.compare(loginCred.password,user.password).then(response=>{
                if(response){
                    const jwtToken = jwt.sign({
                        email: user.email,
                        id:user._id
                    },
                    process.env.SECRET_KEY,{
                        expiresIn : "24h"
                    })
                    res.status(200).json({
                        message : "Login credential matched!!",
                        Token : jwtToken
                    })
                }else{
                    res.status(400).json({
                        message : "Email or password does not match!!"
                    })
                }
            })
        }else{
            res.status(400).json({
                message: "Email is not registered with us.."
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message:"Internal server Error!!"
        })
    })
})

module.exports = userRouter;
