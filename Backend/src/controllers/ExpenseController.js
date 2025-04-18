const expensemodel = require("../models/ExpenseModel");

const getAllExpenses = async (req, res) => {
    try {
        const getexpense = await expensemodel.find().populate("accountid userid");
        if (getexpense.length == 0) {
            res.status(404).json({
                message: "No expenses found",
            });
        } else {
            res.status(200).json({
                message: "Expenses retrieved successfully",
                data: getexpense,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving expenses",
            data: e.message,
        });
    }
};

const addNewExpense = async (req, res) => {
    try {
        // Ensure userid is provided
        if (!req.body.userid) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
        
        const addexpense = await expensemodel.create(req.body);
        res.status(201).json({
            message: "Expense added successfully",
            data: addexpense,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error adding expense",
            data: e.message,
        });
    }
};

const findexpensebyid = async (req, res) => {
    try {
        const expensebyid = await expensemodel.findById(req.params.id);
        if (!expensebyid) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }
        res.status(200).json({
            message: "Expense retrieved successfully",
            data: expensebyid,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving expense",
            data: e.message,
        });
    }
};

const findexpensebyidanddelete = async (req, res) => {
    try {
        const deleteexpense = await expensemodel.findByIdAndDelete(req.params.id);
        if (!deleteexpense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }
        res.status(200).json({
            message: "Expense deleted successfully",
            data: deleteexpense,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error deleting expense",
            data: e.message,
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const updatedExpense = await expensemodel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }
        res.status(200).json({
            message: "Expense updated successfully",
            data: updatedExpense,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error updating expense",
            data: e.message,
        });
    }
};

const getExpensesByUserId = async (req, res) => {
    try {
        const userId = req.params.userid;
        
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const expenses = await expensemodel.find({ userid: userId }).populate("accountid userid");
        
        if (expenses.length === 0) {
            res.status(404).json({
                message: "No expenses found for this user",
            });
        } else {
            res.status(200).json({
                message: "Expenses retrieved successfully",
                data: expenses,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving expenses by userid",
            data: e.message,
        });
    }
};

const getExpensesByUserIdAndCategoryId = async (req, res) => {
    try {
        const userId = req.params.userid;
        const categoryId = req.params.categoryid;
        
        if (!userId || !categoryId) {
            return res.status(400).json({
                message: "User ID and Category ID are required",
            });
        }

        const expenses = await expensemodel.find({ 
            userid: userId,
            categoryid: categoryId 
        }).populate("accountid userid categoryid");
        
        if (expenses.length === 0) {
            res.status(404).json({
                message: "No expenses found for this user and category combination",
            });
        } else {
            res.status(200).json({
                message: "Expenses retrieved successfully",
                data: expenses,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving expenses by userid and categoryid",
            data: e.message,
        });
    }
};



module.exports = {
    getAllExpenses,
    addNewExpense,
    findexpensebyid,
    findexpensebyidanddelete,
    updateExpense,
    getExpensesByUserId,
    getExpensesByUserIdAndCategoryId
};