const expensecontroller = require("../controllers/ExpenseController");
const routes = require("express").Router();

routes.post("/addexpense",authMiddleware.authMiddleware, expensecontroller.addNewExpense);
routes.get("/getexpenses",authMiddleware.authMiddleware, expensecontroller.getAllExpenses);
routes.get("/findexpense/:id",authMiddleware.authMiddleware, expensecontroller.findexpensebyid);
routes.delete("/deleteexpense/:id",authMiddleware.authMiddleware, expensecontroller.findexpensebyidanddelete);
routes.put("/updateexpense/:id",authMiddleware.authMiddleware, expensecontroller.updateExpense);
routes.get("/getexpensesbyuser/:userid",authMiddleware.authMiddleware, expensecontroller.getExpensesByUserId);
routes.get("/user/:userid/category/:categoryid",authMiddleware.authMiddleware, expensecontroller.getExpensesByUserIdAndCategoryId);


module.exports = routes;