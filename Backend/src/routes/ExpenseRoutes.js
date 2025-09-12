const expensecontroller = require("../controllers/ExpenseController");
const routes = require("express").Router();
const authmiddleware=require("../middleware/AuthMiddleware")

routes.post("/addexpense",authmiddleware.authMiddleware, expensecontroller.addNewExpense);
routes.get("/getexpenses",authmiddleware.authMiddleware, expensecontroller.getAllExpenses);
routes.get("/findexpense/:id",authmiddleware.authMiddleware, expensecontroller.findexpensebyid);
routes.delete("/deleteexpense/:id",authmiddleware.authMiddleware, expensecontroller.findexpensebyidanddelete);
routes.put("/updateexpense/:id",authmiddleware.authMiddleware, expensecontroller.updateExpense);
routes.get("/getexpensesbyuser/:userid",authmiddleware.authMiddleware, expensecontroller.getExpensesByUserId);
routes.get("/user/:userid/category/:categoryid",authmiddleware.authMiddleware, expensecontroller.getExpensesByUserIdAndCategoryId);


module.exports = routes;