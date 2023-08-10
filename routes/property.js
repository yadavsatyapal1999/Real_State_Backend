const express = require("express");
const propertyRouter = express.Router();
const property = require("../model/property_schema");
const testSchema = require("../model/test");



propertyRouter.get("/v1/", (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
})

propertyRouter.post("/v1/", (req, res) => {

    const model = req.body;
    console.log("post api")
    const testdata = new testSchema({
        name: model.name
    })
    testdata.save().then(rec => {
        res.status(200).json({
            data: rec,
        })

    })
        .catch(err => {
            res.json({
                error: err
            })
        })

})

propertyRouter.put("/v1/update/:id", (req, res) => {

})

propertyRouter.delete("/v1/:id", (req, res) => {

})



module.exports = propertyRouter;
