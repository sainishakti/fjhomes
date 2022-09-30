const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Defining Schema
const userSchema = new mongoose.Schema({

userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  image: {
    type: [String],
  },
  title: {
    type: String,
  },
  price: 
    {
      number: {
        type: String,
      },
      currency: {
        type: String,
      },
      frequency: {
        type: String,
      },
    },
  
  discount: 
    {
      number: {
        type: String,
      },
      cal: {
        type: String,
      },
    },
  
  location: {
    type: String,
  },
  location_point: {
    type: {
      type: String,
    },
    coordinates: {
      type: String,
    },
  },
  license_number: {
    type: String,
  },
  bed_count: {
    type: Number,
  },
  guest_count: {
    type: Number,
  },
  property_type: {
    type: String,
  },
  description: {
    type: String,
  },
  amenities: {
    type: Array,
  },
  facilities: {
    type: Array,
  },
  filter: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "decline"],
    default: "pending",
  },
  check_in_date: {
    type: String,
    required: true,
  },
  check_out_date: {
    type: String,
    required: true,
  },
  location_name: {
    type: String,
    required: true,
  },
  location_address: {
    type: String,
    required: true,
  },
  location_lat: {
    type: String,
    required: true,
  },
  location_lng: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps:true
},


)

// Model
module.exports=UserModel = mongoose.model("properties", userSchema)




