const express = require("express");
const propertyRouter = express.Router();
const Property = require("../model/property_schema");
const auth = require('../Auth/authorization');

propertyRouter.get("/v1/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const limit = 10;

    Property.find().skip(skip).limit(limit).then(res => {
        res.status(200).json({
            message: "Property details fetched successfully",
            data: res
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    })
})

propertyRouter.post("/v1/addproperty", auth, (req, res) => {
    const data = req.body;  // need to provide data in body

    const propertyData = new Property({ //add new property
        user: req.id,    // get id from token
        ppdid: data.ppdid,
        property_type: data.property_type,
        price: data.price,
        property_age: data.property_age,
        property_description: data.property_description,
        negotiable: data.negotiable,
        ownerShip: data.ownerShip,
        property_approved: data.property_approved,
        bank_lone: data.bank_lone,
        length: data.length,
        breath: data.breath,
        area: data.area,
        area_unit: data.area_unit,
        bhk: data.bhk,
        floor: data.floor,
        attached: data.attached,
        western: data.western,
        furnished: data.furnished,
        parking: data.parking,
        lift: data.lift,
        electricity: data.electricity,
        facing: data.facing,
        owner_name: data.owner_name,
        mobile: data.mobile,
        postedby: data.postedby,
        saletype: data.saletype,
        featured: data.featured,
        ppdpackage: data.ppdpackage,
        image: data.photo,  // relative path multer to be implemented
        email: data.email,
        city: data.city,
        addressarea: data.addressarea,
        pincode: data.pincode,
        address: data.address,
        landmark: data.landmark,
        longitude: data.longitude,
        latitude: data.latitude
    })
    propertyData.save().then(rec => {
        res.status(200).json({
            message: "data saved sucessfully"
        })
    }).catch(err => {
        res.status(500).json({
            message: "unable to save data",
          //  detail:err   this line to be used to checked error
        })
    })
})

propertyRouter.put("/v1/update/:id", (req, res) => {

})

propertyRouter.delete("/v1/:id", (req, res) => {

})



module.exports = propertyRouter;
