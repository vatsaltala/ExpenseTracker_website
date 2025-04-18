const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
    required: true
},
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  accountid: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"], // Corrected enum syntax
    default: "Active", // Optional: Add a default value
  },
  amount: {
    type: Number,
  },
  transactiondate: {
    type: Date,
  },
  description: {
    type: String,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("expense", expenseSchema);