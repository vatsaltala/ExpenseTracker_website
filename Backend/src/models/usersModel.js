const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const userSchema=new Schema({
        firstname:{
            type:String
        },
        lastname:{
            type:String
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
        },
        roleId:{
            type:Schema.Types.ObjectId,
            ref:"roles"
        },
        role:{
            type:String,
            enum:['admin','user'],
            default:"user"
        }
    
})
module.exports=mongoose.model("users",userSchema)