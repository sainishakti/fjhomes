
module.exports =app=>{
  const router = require("express").Router()
  const controller = require("../controller/userController.js") 
  const {checkUserAuth} = require("../middlewares/middlewares.js") 


  router.post("/Register",controller.userRegister)
  router.post("/Login",controller.userLogin)
  router.use('/Changepassword', checkUserAuth)
  router.post("/Changepassword",controller.changeUserPassword)
  router.post("/ForgetPassword",controller.sendOtpEmail)
  router.post("/VerifyOtp",controller.verifyOtp)
  router.use('/ResetPassword', checkUserAuth)
  router.post("/ResetPassword",controller.userPasswordReset)
  router.post("/UpdateProfile",controller.updateProfile)
  router.get("/GetProfile",controller.getProfile)
  router.post("/DeactivateAccount",controller.Deactivate)
  



  app.use('/',router)

}