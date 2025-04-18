const categorycontroller= require("../controllers/CategoryController")
const routes= require("express").Router()

routes.post("/addcategory", categorycontroller.savecategory )
routes.get("/getcategories", categorycontroller.allcategory)
routes.get("/category/:id", categorycontroller.findcategorybyid)
routes.delete("/deletecategory/:id", categorycontroller.findcategorybyidanddelete)
routes.put("/updatecategory/:id", categorycontroller.updateCategory)    

module.exports=routes