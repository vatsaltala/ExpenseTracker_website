const mongoose= require("mongoose")
const Schema= mongoose.Schema

const profileSchema= new Schema({
    name:{
        type:String
    },
    profilepic:{
        type:String
    }
})

module.exports=mongoose.model("profile", profileSchema)