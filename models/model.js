const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Defining Schema
const userSchema = new mongoose.Schema({
  //name: { type: String},
  email: { type: String},
  phone: { type: String},
  password: { type: String },
  otp: { type: String},
  displayName: { type: String},
  realName: { type: String},
  countryCode: { type: String},
  bio: { type: String},
  liveIn: { type: String},
  speak: { type: String},
  deactivate: { type: Boolean,default:false},
 },
{
  timestamps:true
},


)

// Model
module.exports=UserModel = mongoose.model("user", userSchema)




