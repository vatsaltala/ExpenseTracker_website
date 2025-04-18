const incomecategorycontroller= require("../controllers/IncomeCategoryController")
const routes= require("express").Router()

routes.post("/addincomecategory", incomecategorycontroller.savecategory )
routes.get("/getincomecategories", incomecategorycontroller.allcategory)
routes.get("/incomecategory/:id", incomecategorycontroller.findcategorybyid)
routes.delete("/deleteincomecategory/:id", incomecategorycontroller.findcategorybyidanddelete)
routes.put("/updateincomecategory/:id", incomecategorycontroller.updateCategory)

module.exports=routes