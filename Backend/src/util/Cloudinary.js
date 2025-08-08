
const cloudinary = require("cloudinary").v2;
require("dotenv").config()


const uploadFileToCloudinary = async (file) => {
        cloundinary.config({
        cloud_name:process.env.cloud_name,
        api_key:process.env.api_key,
        api_secret:process.env.api_secret
    })

    const cloundinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}