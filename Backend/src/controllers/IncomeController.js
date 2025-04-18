const incomemodel = require("../models/IncomeModel");

const getAllIncomes = async (req, res) => {
    try {
        const getincome = await incomemodel.find().populate("accountid userid");
        if (getincome.length == 0) {
            res.status(404).json({
                message: "No incomes found",
            });
        } else {
            res.status(200).json({
                message: "Incomes retrieved successfully",
                data: getincome,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving incomes",
            data: e.message,
        });
    }
};

const addNewIncome = async (req, res) => {
    try {
        // Ensure userid is provided
        if (!req.body.userid) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
        
        const addincome = await incomemodel.create(req.body);
        res.status(201).json({
            message: "Income added successfully",
            data: addincome,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error adding income",
            data: e.message, // Include the error message for debugging
        });
    }
};

const findincomebyid = async (req, res) => {
    try {
        const incomebyid = await incomemodel.findById(req.params.id);
        if (!incomebyid) {
            return res.status(404).json({
                message: "Income not found",
            });
        }
        res.status(200).json({
            message: "Income retrieved successfully",
            data: incomebyid,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving income",
            data: e.message,
        });
    }
};

const findincomebyidanddelete = async (req, res) => {
    try {
        const deleteincome = await incomemodel.findByIdAndDelete(req.params.id);
        if (!deleteincome) {
            return res.status(404).json({
                message: "Income not found",
            });
        }
        res.status(200).json({
            message: "Income deleted successfully",
            data: deleteincome,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error deleting income",
            data: e.message,
        });
    }
};

const updateIncome = async (req, res) => {
    try {
        const updatedIncome = await incomemodel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({
                message: "Income not found",
            });
        }
        res.status(200).json({
            message: "Income updated successfully",
            data: updatedIncome,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error updating income",
            data: e.message,
        });
    }
};

const getIncomesByUserId = async (req, res) => {
    try {
        const userId = req.params.userid;
        
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const incomes = await incomemodel.find({ userid: userId }).populate("accountid userid");
        
        if (incomes.length === 0) {
            res.status(404).json({
                message: "No incomes found for this user",
            });
        } else {
            res.status(200).json({
                message: "Incomes retrieved successfully",
                data: incomes,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Error retrieving incomes by userid",
            data: e.message,
        });
    }
}
    const getIncomesByUserIdAndCategoryId = async (req, res) => {
        try {
            const userId = req.params.userid;
            const categoryId = req.params.categoryid;
            
            if (!userId || !categoryId) {
                return res.status(400).json({
                    message: "User ID and Category ID are required",
                });
            }
    
            const incomes = await incomemodel.find({ 
                userid: userId,
                categoryid: categoryId 
            }).populate("accountid userid categoryid");
            
            if (expenses.length === 0) {
                res.status(404).json({
                    message: "No incomes found for this user and category combination",
                });
            } else {
                res.status(200).json({
                    message: "incomes retrieved successfully",
                    data: expenses,
                });
            }
        } catch (e) {
            res.status(500).json({
                message: "Error retrieving incomes by userid and categoryid",
                data: e.message,
            });
        }
};

module.exports = {
    getAllIncomes,
    addNewIncome,
    findincomebyid,
    findincomebyidanddelete,
    updateIncome,
    getIncomesByUserId ,
    getIncomesByUserIdAndCategoryId
};