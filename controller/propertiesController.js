const  UserModel =require("../models/propertiesModels.js")
const  modeModel =require("../models/userModel.js")

module.exports.properties = async (req, res) => {
    const{userid,image,title,price,discount,location,location_point,license_number,bed_count,
    guest_count,property_type,description,amenities,facilities,filter,status,check_in_date,check_out_date,location_name,location_address,
    location_lat,location_lng,is_deleted} = req.body;
try{
   const _id =req.body.userid
   console.log(_id);
  const user = await modeModel.findById({_id:_id })
  const mode = user.hostMode
  console.log(mode)
if(mode==true){
        const data = new UserModel({
            userid:userid,
            image: image,
            title: title,
            price : price,
            discount:discount,
            location:location,
            location_point:location_point,
            license_number:license_number,
            bed_count:bed_count,
            guest_count:guest_count,
            property_type:property_type,
            description:description,
            amenities:amenities,
            facilities:facilities,
            filter:filter,
            status:status,
            check_in_date:check_in_date,
            check_out_date:check_out_date,
            location_name:location_name,
            location_address:location_address,
            location_lat:location_lat,
            location_lng:location_lng,
            is_deleted:is_deleted
        })
        await data.save()
        res.status(201).send({ "status":"200", "success":"True", "message": "Add Property Successfully"})
      }else{
        res.status(401).send({ "status": "401","success":"False", "message": "you Are Guest you Don't Create Properties" })
      }
    }catch(error){
        res.status(401).send({ "status": "401","success":"False", "message": "Unable to Add" })
        console.log(error);
    }

}
//ListallProperty
module.exports.listProperty = async (req, res) => {
    try{
    const data = await UserModel.find()
    if(data){
    res.send({ "status": "201","success":"True", "message": "get Property Successfully",data })
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Get" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }
  //getProperties

  module.exports.getProperties = async (req, res) => {
    const _id = req.query;
    console.log("_id...............=>",_id);
    try{
      const data = await UserModel.findOne({_id})
    if(data){
    res.send({ "status": "201","success":"True", "message": "get Property Successfully",data })
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Get" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }