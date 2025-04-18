

import React, { useState, useEffect } from "react";
import "../user/userprofile.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminProfile = () => {
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState({
    firstname: "",
    email: "",
    avatarUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [cloudUrl, setCloudUrl] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axios.post("http://localhost:3000/create_product_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data && res.data.secure_url) {
        setCloudUrl(res.data.secure_url);
        setImagePreview(res.data.secure_url);
        setIsImageUploaded(true);
      } else {
        console.error("Image upload response malformed:", res.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setCloudUrl("");
    setIsImageUploaded(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userid = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3000/user/getuser/${userid}`);
        setUserData(res.data.data);
        if (res.data.data.avatarUrl) {
          setImagePreview(res.data.data.avatarUrl);
          setIsImageUploaded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <h1>Admin Profile</h1>
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
            <img src={imagePreview} alt="Profile" className="profile-image" />
            <button onClick={removeImage} className="change-image-button">
              Remove Image
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

export default AdminProfile;
