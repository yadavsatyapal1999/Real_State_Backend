const express = require("express");
const propertyRouter = express.Router();
const Property = require("../model/property_schema");


propertyRouter.get("/v1/",(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1)*limit;
    const limit = 10;

    Property.find().skip(skip).limit(limit).then(res=>{
        res.status(200).json({
            message : "Property details fetched successfully",
            data : res
        })
    }).catch(err=>{
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    })
})

propertyRouter.post("/v1/",(req,res)=>{
    const testData = req.body;
    const test = new Property({
        name : testData.name
    })
    test.save().then(response=>{
        res.status(200).json({
            message : response
        })
    }).catch(err=>{
        res.status(500).json({
            errordesc:err
        })
    })
})

propertyRouter.put("/v1/update/:id", (req, res) => {

})

propertyRouter.delete("/v1/:id", (req, res) => {

})



module.exports = propertyRouter;
