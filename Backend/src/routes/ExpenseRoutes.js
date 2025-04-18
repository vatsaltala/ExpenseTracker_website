const expensecontroller = require("../controllers/ExpenseController");
const routes = require("express").Router();

routes.post("/addexpense", expensecontroller.addNewExpense);
routes.get("/getexpenses", expensecontroller.getAllExpenses);
routes.get("/findexpense/:id", expensecontroller.findexpensebyid);
routes.delete("/deleteexpense/:id", expensecontroller.findexpensebyidanddelete);
routes.put("/updateexpense/:id", expensecontroller.updateExpense);
routes.get("/getexpensesbyuser/:userid", expensecontroller.getExpensesByUserId);
routes.get("/user/:userid/category/:categoryid", expensecontroller.getExpensesByUserIdAndCategoryId);


module.exports = routes;