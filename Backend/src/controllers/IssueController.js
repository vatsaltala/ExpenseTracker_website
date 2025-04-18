const issuemodel=require("../models/IssueModel")


const saveissue= async(req,res)=>{
    try{
        const addissue=await issuemodel.create(req.body)
        res.status(201).json({
            message:"create new issue",
            data:addissue
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }

}

const allissue =async(req,res)=>{
    try{
        const issue=await issuemodel.find()
        res.status(200).json({
            message:"all issues display",
            data:issue
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findissuebyid =async(req,res)=>{
    try{
        const issuebyid= await issuemodel.findOne(req.params.id)
        res.status(200).json({
            message:"issue display",
            data:issuebyid
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findissuebyidanddelete=async(req,res)=>{
    try{
        const deleteissue= await issuemodel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"issue deleted successfully",
            data:deleteissue
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

module.exports={saveissue, allissue, findissuebyid, findissuebyidanddelete}