const accountmodel=require("../models/AccountModel")


const saveaccount= async(req,res)=>{
    try{
        const addaccount=await accountmodel.create(req.body)
        res.status(201).json({
            message:"create new account",
            data:addaccount
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }

}

const allaccount =async(req,res)=>{
    try{
        const account=await accountmodel.find().populate("accountid userid ")
        res.status(200).json({
            message:"all accounts display",
            data:account
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findaccountbyid =async(req,res)=>{
    try{
        const accountbyid= await accountmodel.findById(req.params.id)
        res.status(200).json({
            message:"account display",
            data:accountbyid
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findaccountbyidanddelete=async(req,res)=>{
    try{
        const deleteaccount= await accountmodel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"account deleted successfully",
            data:deleteaccount
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

module.exports={saveaccount, allaccount, findaccountbyid, findaccountbyidanddelete}