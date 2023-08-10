const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({

})

const propertyModel = mongoose.model("Property",propertySchema);

module.exports = propertyModel;