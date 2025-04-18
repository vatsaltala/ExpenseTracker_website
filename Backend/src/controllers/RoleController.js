const rolemodel=require("../models/RoleModel")


const saverole= async(req,res)=>{
    try{
        const addrole=await rolemodel.create(req.body)
        res.status(201).json({
            message:"create new role",
            data:addrole
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }

}

const allrole =async(req,res)=>{
    try{
        const role=await rolemodel.find()
        res.status(200).json({
            message:"all roles display",
            data:role
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findrolebyid =async(req,res)=>{
    try{
        const rolebyid= await rolemodel.findOne(req.params.id)
        res.status(200).json({
            message:"role display",
            data:rolebyid
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findrolebyidanddelete=async(req,res)=>{
    try{
        const deleterole= await rolemodel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"role deleted successfully",
            data:deleterole
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

module.exports={saverole, allrole, findrolebyid, findrolebyidanddelete}