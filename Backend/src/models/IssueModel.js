const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const issueSchema=new Schema({
        name:{
            type:String
        },
        message:{
            type:String
        },
        email:{
            type:String,
            unique:true
        },
        Date:{
            type:Date,
            default:Date.now()
        }
        
})
module.exports=mongoose.model("issues",issueSchema)