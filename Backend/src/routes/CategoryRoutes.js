const categorycontroller= require("../controllers/CategoryController")
const routes= require("express").Router()
const authMiddleware=require("../middleware/AuthMiddleware")

routes.post("/addcategory",authMiddleware.authMiddleware, categorycontroller.savecategory )
routes.get("/getcategories",authMiddleware.authMiddleware, categorycontroller.allcategory)
routes.get("/category/:id",authMiddleware.authMiddleware,categorycontroller.findcategorybyid)
routes.delete("/deletecategory/:id",authMiddleware.authMiddleware, categorycontroller.findcategorybyidanddelete)
routes.put("/updatecategory/:id",authMiddleware.authMiddleware, categorycontroller.updateCategory)    

module.exports=routes