const  UserModel =require("../models/userModel.js")
const  bcrypt =require("bcrypt")
const  jwt =require("jsonwebtoken")
const nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport');

module.exports.userRegister = async (req, res) => {
    const { phone,email, password, password_confirmation } = req.body
    const user = await UserModel.findOne({ email: email })
    const users = await UserModel.findOne({ phone: phone })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    }
else if(users) {
      res.send({ "status": "failed", "message": "Phone already exists" })
    }
    else {
      if ( email && password && password_confirmation && phone ) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
             
              email: email,
              password: hashPassword,
              phone : phone,
            
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status":"200", "success":"True", "message": "Registration Successfully", "token": token })
          } catch (error) {
            console.log(error)
            res.res.status(401).send({ "status": "401","success":"False", "message": "Unable to Register" })
          }
        } else {
            res.res.status(401).send({ "status": "401","success":"False",  "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.res.status(401).send({"status": "401","success":"False", "message": "All fields are required" })
      }
    }
  }
  //login
module.exports.userLogin = async (req, res) => {
    try {
      const { email, password,phone } = req.body
      if (password && (email || phone)) {
        const user = await UserModel.findOne({$or: [{email: email},{phone: phone}]})
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if (((user.email === email) ||(user.phone == phone)) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.send({ "status": "201","success":True, "message": "Login Success", "token": token })
          } else {
            res.status(401).send({"status": "401","success":"False", "message":  "Email or Password is not Valid" })
          }
        } else {
          res.status(401).send({"status": "401","success":"False", "message":  "You are not a Registered User"  })
        }
      } else {
     res.status(401).send({"status": "401","success":"False", "message":  "All Fields are Required" })
        
      }
    } catch (error) {
      console.log(error)
     res.status(401).send({"status": "401","success":"False", "message": "Unable to Login" })
    }
  }
  //changepassword

  module.exports.changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.status(401).send({"status": "401","success":"False", "message":  "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "201","success":True, "message": "Password changed succesfully" })
      }
    } else {
      res.status(401).send({"status": "401","success":"False", "message":  "All Fields are Required" })
    }
  }
//forgetPassword

module.exports.sendOtpEmail = async (req, res) => {
  const { email } = req.body
var otp = Math.floor(1000 + Math.random() * 9000);
console.log(otp);
  if (email) {
    const user = await UserModel.findOne({ email: email })
    if (user) {
   const data = await UserModel.findOneAndUpdate({email},{ otp:otp})
      const transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp-mail.outlook.com", 
        secureConnection: false, 
        port: 587,
        auth: {
            user: "shakti2525@outlook.com",
            pass: "saini@2525"
        }
    }));
    var mailOptions = {
      from:  "shakti2525@outlook.com", 
      to: email, 
      subject: 'Sending Otp Your Mail',
      text: ""+otp, 
       };
  
  // // send mail with defined transport object
   transporter.sendMail(mailOptions, function(error, info){
      if(error){
      console.log(error);
      }else{
        console.log(info);
        res.send({ "status": "201","success":"True", "message": "Otp Send Your mail Successfully" })
      }
    })
       }
    else {
      res.status(401).send({"status": "401","success":"False", "message":  "Email doesn't exists"   }) 
  }
    }
  else {
    res.status(401).send({"status": "401","success":"False", "message":  "Email Field is Required"  })
  }
  }
  //verifyOtp
  module.exports.verifyOtp = async (req, res) => {
    const {otp,email } = req.body
    try{
    const user = await UserModel.findOne({$and: [{email: email},{otp: otp}]})
    if(user){
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
      res.send({ "status": "201","success":"True", "message": "Otp Verify Successfully",token })
    }else{
      res.status(401).send({"status": "401","success":"False", "message":  " Your Otp  Is Invalid"  })
    }
  }catch(error){
     res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong"  })
  }
  }
  //setPassword

  module.exports.userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    try {
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.status(401).send({"status": "401","success":"False", "message":  "New Password and Confirm New Password doesn't match"   })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "201","success":"True", "message": "Password Reset Successfully" })
        }
      } else {
        res.status(401).send({"status": "401","success":"False", "message":  "All Fields are Required"})
      }
    }catch (error){
     console.log("err...........=>",error)
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" ,error })
    }
  }
  //addPersonalInfo
  module.exports.updateProfile = async (req, res) => {
    const { displayName,realName, countryCode,phone,email,bio,liveIn,speak,_id} = req.body
    console.log("heruku");
    try{
    const data = await UserModel.findByIdAndUpdate({ _id: _id },
      {
      displayName: displayName,
      email: email,
      realName : realName,
      countryCode:countryCode,
      phone:phone,
      bio:bio,
      liveIn:liveIn,
      speak:speak,
      profile:req.file.filename
      })
    if(data){
    res.send({ "status": "201","success":"True", "message": "update Profile Successfully",data })
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To update" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }

  //getProfile
  module.exports.getProfile = async (req, res) => {
    const _id = req.query;
    console.log("_id...............=>",_id);
    try{
    const data = await UserModel.findOne({_id},{_id:0,password:0})
    if(data){
    res.send({ "status": "201","success":"True", "message": "get Profile Successfully",data })
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Get" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }
  //deactivate
  module.exports.Deactivate = async (req, res) => {
    const { deactivate,_id} = req.body
    try{
    const data = await UserModel.findByIdAndUpdate({ _id: _id },
      {
        deactivate:deactivate
      })
    if(data){
    res.send({ "status": "201","success":"True", "message": "Deactivate Profile Successfully"})
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To Deactivate" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }

  //updated GuestMode And Host Mode
   
  module.exports.updateMode= async (req, res) => {
  try{
    const  _id = req.body._id
      const  guestMode = req.body.guestMode
      if(guestMode==true){
         hostMode = false
      }
     if(guestMode == false){
       hostMode = true
      }
    const data = await UserModel.findByIdAndUpdate({ _id: _id },
      {
        hostMode: hostMode,
        guestMode: guestMode
      })
      console.log("data",data);
    if(data){
    res.send({ "status": "201","success":"True", "message": "update Mode Successfully"})
    }else{
      res.status(401).send({"status": "401","success":"False", "message": "Unable To update" })
    }
    }catch(error){
      res.status(401).send({"status": "401","success":"False", "message":  "Something went Wrong" })
      console.log("error",error);
}
  }  
