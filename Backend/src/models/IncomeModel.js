const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    accountid: {
        type: Schema.Types.ObjectId,
        ref: "account",
    },
    status: {
        type: String,
        enum: ["Active", "InActive"],
        default: "Active",
    },
    amount: {
        type: Number,
        required: true
    },
    transactiondate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
});

module.exports = mongoose.model("income", incomeSchema);