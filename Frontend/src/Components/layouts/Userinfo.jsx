import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Userinfo.css";

export const Userinfo = () => {
  const [profiles, setProfiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [per,setPer]=useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();

  const imageFile = watch("image");

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    // Show preview when image changes
    if (imageFile && imageFile[0]) {
      setPreview(URL.createObjectURL(imageFile[0]));
    } else {
      setPreview(null);
    }
  }, [imageFile]);

const fetchProfiles = async () => {
  try {
    const res = await axios.get("http://localhost:3000/upload");
    setProfiles(res.data.data || []);

    // Enable upload if no profiles exist
    if (!res.data.data || res.data.data.length === 0) {
      setPer(true);
    } else {
      setPer(false);
    }
  } catch (err) {
    console.error("Error fetching profiles:", err);
  }
};

const onSubmit = async (data) => {
  if (!data.name || (!data.image && !editId)) {
    alert("Please enter name and select an image");
    return;
  }

  const formData = new FormData();
  formData.append("name", data.name);
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }

  try {
    if (editId) {
      await axios.put(`http://localhost:3000/upload/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    reset();
    setPreview(null);
    fetchProfiles();
  } catch (err) {
    if (err.response?.status === 400) {
      alert(err.response.data.message);
    } else {
      console.error("Error saving profile:", err);
    }
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/upload/${id}`);
      fetchProfiles();
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  const handleEdit = (profile) => {
    setValue("name", profile.name);
    setPreview(profile.profilepic);
    setEditId(profile._id);
  };

  return (
    <div className="container">
      <h2>User Profiles</h2>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              {...register("name")}
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </div>

          {preview && (
            <div className="preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
 
          <button
            type="submit"
            disabled={!editId && !per} // disable only when both are false
          >
            {editId ? "Update" : "Upload"}
          </button>


        </form>
      </div>

      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <img
              src={profile.profilepic}
              alt={profile.name}
              onClick={() => handleEdit(profile)}
            />
            <p>{profile.name}</p>
            <button
              className="delete-btn"
              onClick={() => handleDelete(profile._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
