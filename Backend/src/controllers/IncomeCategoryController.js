const incomecategorymodel=require("../models/IncomeCategoryModel")


const savecategory= async(req,res)=>{
    try{
        const addcategory=await incomecategorymodel.create(req.body)
        res.status(201).json({
            message:"create new category",
            data:addcategory
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }

}

const allcategory =async(req,res)=>{
    try{
        const category=await incomecategorymodel.find()
        res.status(200).json({
            message:"all categories display",
            data:category
        })
    }
    catch(e){
        res.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findcategorybyid =async(req,res)=>{
    try{
        const categorybyid= await incomecategorymodel.findById(req.params.id)
        res.status(200).json({
            message:"category display",
            data:categorybyid
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

const findcategorybyidanddelete=async(req,res)=>{
    try{
        const deletecategory= await incomecategorymodel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"category deleted successfully",
            data:deletecategory
        })
    }
    catch(e){
        req.status(500).json({
            message:"error",
            data:e
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const updatedcategory = await incomecategorymodel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedcategory) {
            return res.status(404).json({
                message: "category not found",
            });
        }
        res.status(200).json({
            message: "category updated successfully",
            data: updatedcategory,
        });
    } catch (e) {
        res.status(500).json({
            message: "Error updating category",
            data: e.message,
        });
    }
};

module.exports={savecategory, allcategory, findcategorybyid, findcategorybyidanddelete, updateCategory}