
module.exports =app=>{
  const router = require("express").Router()
  const controller = require("../controller/userController.js") 
  const {checkUserAuth} = require("../middlewares/middlewares.js") 
  const multer = require("multer")

  router.post("/Register",controller.userRegister)
  router.post("/Login",controller.userLogin)
  router.use('/Changepassword', checkUserAuth)
  router.post("/Changepassword",controller.changeUserPassword)
  router.post("/ForgetPassword",controller.sendOtpEmail)
  router.post("/VerifyOtp",controller.verifyOtp)
  router.use('/ResetPassword', checkUserAuth)
  router.post("/ResetPassword",controller.userPasswordReset)
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
  router.post("/UpdateProfile",upload.single('file'),controller.updateProfile)
  router.get("/GetProfile",controller.getProfile)
  router.post("/DeactivateAccount",controller.Deactivate)
  router.post("/updatedMode",controller.updateMode)
  



  app.use('/',router)

}