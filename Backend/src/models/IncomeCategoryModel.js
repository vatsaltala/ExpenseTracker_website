const mongoose= require("mongoose")
const Schema = mongoose.Schema
const incomecategorySchema=new Schema({
    category:{
        type:String,
    }
})
module.exports=mongoose.model("incomecategory",incomecategorySchema)