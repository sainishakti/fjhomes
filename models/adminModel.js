const mongoose = require("mongoose");

// Defining Schema
const adminSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String},
  phone: { type: String},
  address: { type: String},
  password: { type: String},
  adminProfile: { type: String,default:"user.png"},
  
 },
{
  timestamps:true
},


)

// Model
module.exports=adminModel = mongoose.model("admin", adminSchema)




