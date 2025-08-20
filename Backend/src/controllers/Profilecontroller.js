const profileModel = require("../models/profilemodel");

// Create new profile
const createProfile = async (req, res) => {
  try {

    if (!req.file) return res.status(400).json({ message: "Image is required" });
    
    const profile = await profileModel.create({
      name: req.body.name,
      profilepic: req.file.path,
      userid:req.params.id
    });
    // console.log("abcdefghijklmnopqrstuvwxyz:",req.user._id)

    res.status(201).json({
      message: "Profile data added successfully",
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred during adding profile data",
      error: err.message
    });
  }
};

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find().populate("userid");
    res.status(200).json({
      message: "Profile data fetched successfully",
      data: profiles
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred during fetching profile data",
      error: err.message
    });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    let updateData = { name: req.body.name };
    if (req.file) {
      updateData.profilepic = req.file.path;
    }

    const profile = await profileModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Profile data updated successfully",
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred during updating profile data",
      error: err.message
    });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Profile data deleted successfully",
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred during deleting profile data",
      error: err.message
    });
  }
};

const getprofilebyuserid= async(req,res)=>{
    try{
      const userid=req.params.id
      const getpro=await profileModel.find({userid:userid}).populate("userid")
      res.status(200).json({
        message:"profile fetch succesfully",
        data:getpro
      })
      if(!getpro){
        res.status(404).json({
            message:"any profile doesn't exist",
        })
      }
    }catch(err){
       res.status(500).json({
         mesage:"some error occured during get profile by userid",
         data:err.message
       })
    }
}

module.exports = {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  getprofilebyuserid
};
