
const cloudinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {
        cloundinary.config({
        cloud_name:"drxv1saia",
        api_key:"746829616211295",
        api_secret:"8gp_X-CgwBDNZbjoQX00LEb_Ipw"
    })

    const cloundinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}