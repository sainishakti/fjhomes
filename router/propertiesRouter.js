
module.exports =app=>{
    const router = require("express").Router()
    const propertiesController = require("../controller/propertiesController.js") 
    
  
  
    router.post("/AddProperties",propertiesController.properties)
    router.post("/listProperties",propertiesController.listProperty)
    router.post("/getProperties",propertiesController.getProperties)
    
  
  
  
    app.use('/',router)
}