const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   unique_id: { type: String }
})

//userSchema.index({email:1}),{unique :true}) ;
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
