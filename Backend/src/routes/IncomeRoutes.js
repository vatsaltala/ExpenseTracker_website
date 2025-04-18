
const incomecontroller = require("../controllers/IncomeController");
const routes = require("express").Router();

routes.post("/addincome", incomecontroller.addNewIncome);
routes.get("/getincomes", incomecontroller.getAllIncomes);
routes.get("/findincome/:id", incomecontroller.findincomebyid);
routes.delete("/deleteincome/:id", incomecontroller.findincomebyidanddelete);
routes.put("/updateincome/:id", incomecontroller.updateIncome);
routes.get("/getincomesbyuser/:userid", incomecontroller.getIncomesByUserId);
routes.get("/user/:userid/category/:categoryid",incomecontroller.getIncomesByUserIdAndCategoryId)

module.exports = routes;