const mongoose= require("mongoose")
const Schema= mongoose.Schema

const profileSchema= new Schema({
    name:{
        type:String
    },
    profilepic:{
        type:String
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports=mongoose.model("profile", profileSchema)