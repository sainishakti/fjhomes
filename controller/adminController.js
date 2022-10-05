const  adminModel =require("../models/adminModel.js")
const  userModel =require("../models/userModel.js")
const  bcrypt =require("bcrypt")
const  jwt =require("jsonwebtoken")



module.exports.Admin = async (req, res) => {
    const { name,phone,email,address,password,_id } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
   try{
        const data = await adminModel.findByIdAndUpdate({ _id: _id },
          {
          name: name,
          email: email,
          address : address,
          password:hashPassword,
          phone:phone,
          adminProfile:req.file.filename
          })
          console.log("data",data);
        if(data){
        res.send({ "status": "201","success":"True", "message": "update Admin Profile Successfully"})
        }else{
          res.status(401).send({"status": "401","success":"False", "message": "Unable To update" })
        }
        }catch(error){
          res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
          console.log("error",error);
    }
      }
      
  //AdminLogin    
module.exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (password && email) {
        const user = await adminModel.findOne({email: email})
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          console.log(isMatch);
          if (user.email === email  && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.send({ "status": "201","success":"True", "message": "Login Success", "token": token })
          } else {
            res.status(401).send({"status": "401","success":"False", "message":  "Email or Password is not Valid" })
          }
        } else {
          res.status(401).send({"status": "401","success":"False", "message":  "You are not a Admin"  })
        }
      } else {
       res.status(401).send({"status": "401","success":"False", "message":  "Email or Password Required" })
        
      }
    } catch (error) {
      console.log(error)
     res.status(401).send({"status": "401","success":"False", "message": "Unable to Login" })
    }
  }
//changePassword
  module.exports.changeAdminPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.status(401).send({"status": "401","success":"False", "message":  "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.users._id, { $set: { password: newHashPassword } })
        res.send({ "status": "201","success":"True", "message": "Password changed succesfully" })
      }
    } else {
      res.status(401).send({"status": "401","success":"False", "message":  "All Fields are Required" })
    }
  }
  //hostModeUserList
  module.exports.userHostMode = async (req, res) => {
    try{
    const data = await userModel.find({hostMode:true})
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
  //guestModeUserList
  module.exports.userGuestMode = async (req, res) => {
    try{
    const data = await userModel.find({guestMode:true})
    if(data){
    res.send({ "status": "201","success":"True", "message": "get Property Successfully",data})
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Get" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }
  //deactivateHostMode
  module.exports.DeactivateHostMode = async (req, res) => {
    const { deactivate,_id} = req.body
    try{
    const data = await userModel.findOneAndUpdate({$and:[{ _id: _id},{hostMode:true}]},
      {
        deactivate:deactivate
      })
    if(data){
    res.send({ "status": "201","success":"True", "message": "Deactivate User Successfully"})
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Deactivate" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }
   //deactivatGuestMode
   module.exports.DeactivateGuestMode = async (req, res) => {
    const { deactivate,_id} = req.body
    try{
    const data = await userModel.findOneAndUpdate({$and:[{ _id: _id},{guestMode:true}]},
      {
        deactivate:deactivate
      })
    if(data){
    res.send({ "status": "201","success":"True", "message": "Deactivate  User Successfully"})
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Deactivate" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }
