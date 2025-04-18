import React, { useState, useEffect } from "react";
import "../user/userprofile.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState({
    firstname: "",
    email: "",
    avatarUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Preview the image before upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(data.image[0]);

      const res = await axios.post("/create_product_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(res.data);
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userid = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3000/user/getuser/${userid}`);
        setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="profile-card">
        {/* {!isImageUploaded ? (
          <form onSubmit={handleSubmit(submitHandler)} className="upload-form">
            <div className="form-group">
              <label htmlFor="image-upload" className="upload-label">
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Choose Profile Picture</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input"
              />
            </div>
            <button type="submit" className="upload-button">
              Upload Image
            </button>
          </form>
        ) : (
          <div className="image-preview">
            <img src={imagePreview} alt="Profile Preview" className="profile-image" />
            <button 
              onClick={() => setIsImageUploaded(false)}
              className="change-image-button"
            >
              Change Image
            </button>
          </div>
        )} */}

        <div className="profile-info">
          <h2>{userData.firstname}</h2>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;