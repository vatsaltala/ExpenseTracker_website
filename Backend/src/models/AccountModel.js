const mongoose=require("mongoose")
const Schema= mongoose.Schema
const accountSchema= new Schema({
    
    title:{
        type:String
    },
    totalIncome:{
        type:Number,
    }, 
    totalExpense:{
        type:Number,
    },
    netBalance:{
        type:Number,
    },
    description:{
        type:String
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }

})
module.exports= mongoose.model("account",accountSchema)