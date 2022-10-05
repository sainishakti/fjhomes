const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Defining Schema
const userSchema = new mongoose.Schema({
  profile: { type: String},
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
  hostMode: { type: Boolean,default:true},
  guestMode: { type: Boolean,default:false},
 },
{
  timestamps:true
},


)

// Model
module.exports=UserModel = mongoose.model("user", userSchema)




