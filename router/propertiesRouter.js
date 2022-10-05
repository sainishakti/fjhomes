
module.exports =app=>{
    const router = require("express").Router()
    const propertiesController = require("../controller/propertiesController.js") 
    const multer = require("multer")
  
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
    })
    var upload = multer({ storage: storage })
    router.post("/AddProperties",upload.array('file',8),propertiesController.properties)
    router.post("/listProperties",propertiesController.listProperty)
    router.post("/getProperties",propertiesController.getProperties)
    
  
  
  
    app.use('/',router)
}