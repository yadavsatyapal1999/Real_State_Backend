const express = require("express");
const propertyRouter = express.Router();
const Property = require("../model/property_schema");
const auth = require('../Auth/authorization');
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage});

////To get property list on home pagfrontend
propertyRouter.get("/v1/getproperty",auth, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    

    Property.find().skip(skip).limit(limit).then(result => {
        res.status(200).json({
            message: "Property details fetched successfully",
            data: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    })
})

//Get API for search
propertyRouter.get("/v1/getproperty/:id",(req,res)=>{
    const id = req.params.id;

    Property.findOne({_id:id}).then(result=>{
        if(result){
            res.status(200).json({
                data : result
            })
        }else{
            res.status(400).json({
                message:"Id not Found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message: "Internal server error!!"
        })
    })    
})

///post API for Add New Property
propertyRouter.post("/v1/addproperty",upload.single("propertyimage"),(req, res) => {

    // const ppd_id = "PPD";
    // const existingProp = Property.find().sort({_id: -1}).limit(1);
    // if(existingProp.length!=0){
    //     ppd_id = parseInt(existingProp[0].ppdid.split("D")[1]) + 1;
    // }else{
    //     ppd_id = 1100;
    // }
    const data = req.body;  // need to provide data in body
    const area = parseInt(data.length) * parseInt(data.breadth);
    const views = parseInt(Math.random() * 30);
    const daysleft = parseInt(Math.random()*40);
    const propertyData = new Property({ //add new property
        user: req.id,    // get id from token
        ppdid: "PPD",
        views: views,
        daysleft : daysleft,
        status:"unsold",
        image : req.file.filename, // coming from multer
        property_type: data.property_type,
        price: data.price,
        property_age: data.property_age,
        property_description: data.property_description,
        negotiable: data.negotiable,
        ownerShip: data.ownerShip,
        property_approved: data.property_approved,
        bank_lone: data.bank_lone,
        length: data.length,
        breadth: data.breadth,
        area: area,
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

propertyRouter.put("/v1/updateproperty/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const area = parseInt(data.length) * parseInt(data.breadth);
    Property.findByIdAndUpdate({_id:id},{
        property_type: data.property_type,
        price: data.price,
        property_age: data.property_age,
        property_description: data.property_description,
        negotiable: data.negotiable,
        ownerShip: data.ownerShip,
        property_approved: data.property_approved,
        bank_lone: data.bank_lone,
        length: data.length,
        breadth: data.breadth,
        area: area,
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
        email: data.email,
        city: data.city,
        addressarea: data.addressarea,
        pincode: data.pincode,
        address: data.address,
        landmark: data.landmark,
        longitude: data.longitude,
        latitude: data.latitude
    }).then(updatedProp=>{
        res.status(200).json({
            message : "Updated SuccessFully",
            updateddata : updatedProp
        })
    }).catch(err=>{
        res.status(400).json({
            message: "Failed to Update",
            ErrDesc : err
        })
    })
})

///API called when sold button pressed
propertyRouter.patch("/v1/sold/:id",auth,(req,res)=>{
    const soldId = req.params.id;
    Property.findByIdAndUpdate({_id:soldId},{status : "sold"}).then(result=>{
        res.status(200).json({
            message:"This property has been sold"
        })
    }).catch(err=>{
        res.status(400).json({
            message: "Failed"
        })
    })
})

propertyRouter.delete("/v1/:id", (req, res) => {
    Property.deleteOne({_id:req.params.id}).then(response=>{
        if(response.deletedCount){
            res.status(200).json({
                message: "Deleted Successfully",
                data : response
            })
        }else{
            res.status(400).json({
                message : "Id not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message:"Internal server error.."
        })
    })
})



module.exports = propertyRouter;
