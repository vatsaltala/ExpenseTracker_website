const incomecategorycontroller= require("../controllers/IncomeCategoryController")
const routes= require("express").Router()

routes.post("/addincomecategory",authMiddleware.authMiddleware, incomecategorycontroller.savecategory )
routes.get("/getincomecategories",authMiddleware.authMiddleware, incomecategorycontroller.allcategory)
routes.get("/incomecategory/:id",authMiddleware.authMiddleware, incomecategorycontroller.findcategorybyid)
routes.delete("/deleteincomecategory/:id",authMiddleware.authMiddleware, incomecategorycontroller.findcategorybyidanddelete)
routes.put("/updateincomecategory/:id",authMiddleware.authMiddleware, incomecategorycontroller.updateCategory)

module.exports=routes