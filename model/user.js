const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   unique_id: { type: String }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;