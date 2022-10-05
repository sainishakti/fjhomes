module.exports =app=>{
    const router = require("express").Router()
    const adminController = require("../controller/adminController.js") 
    const {checkUserAuth} = require("../middlewares/adminMiddleware.js") 
    const multer = require("multer")
    
  
    router.post("/LoginAdmin",adminController.adminLogin)
    //updateadmin
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
    })
    var upload = multer({ storage: storage })

    router.post("/updateAdminProfile",upload.single('file'),adminController.Admin)
    router.use('/Changepasswords', checkUserAuth)
    router.post("/Changepasswords",adminController.changeAdminPassword)
    router.post("/userListHost",adminController.userHostMode)
    router.post("/userListGuest",adminController.userGuestMode)
    router.post("/DeactivateGuest",adminController.DeactivateGuestMode)
    router.post("/DeactivateHost",adminController.DeactivateHostMode)
    
    
  
  
  
    app.use('/v1',router)
}