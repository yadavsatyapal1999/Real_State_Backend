const express = require("express");
//const Property = require("../model/property");
const propertyRouter = express.Router();
const Basic = require('../model/property_schema')

propertyRouter.get("/v1/",(req,res)=>{
    res.status(200).json({
        message : "hello world"
    })
})

propertyRouter.post("/v1/",(req,res)=>{

})

propertyRouter.put("/v1/update/:id",(req,res)=>{

})

propertyRouter.delete("/v1/:id",(req,res)=>{

})


module.exports = propertyRouter;
