
const incomecontroller = require("../controllers/IncomeController");
const routes = require("express").Router();
const authMiddleware=require("../middleware/AuthMiddleware")

routes.post("/addincome",authMiddleware.authMiddleware, incomecontroller.addNewIncome);
routes.get("/getincomes",authMiddleware.authMiddleware, incomecontroller.getAllIncomes);
routes.get("/findincome/:id",authMiddleware.authMiddleware, incomecontroller.findincomebyid);
routes.delete("/deleteincome/:id",authMiddleware.authMiddleware, incomecontroller.findincomebyidanddelete);
routes.put("/updateincome/:id",authMiddleware.authMiddleware, incomecontroller.updateIncome);
routes.get("/getincomesbyuser/:userid",authMiddleware.authMiddleware, incomecontroller.getIncomesByUserId);
routes.get("/user/:userid/category/:categoryid",authMiddleware.authMiddleware,incomecontroller.getIncomesByUserIdAndCategoryId)

module.exports = routes;