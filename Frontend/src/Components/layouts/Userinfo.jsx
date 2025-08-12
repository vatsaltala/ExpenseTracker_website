import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Avatar
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const Userinfo = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Info
      </Typography>

      <form onSubmit={handleSubmit}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2 }}
        >
          Choose File
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        <Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={!file}
          >
            Upload
          </Button>
        </Box>
      </form>

      {imageUrl && (
        <Box mt={3}>
          <Typography variant="subtitle1">Uploaded Image:</Typography>
          <Avatar
            src={imageUrl}
            alt="Uploaded"
            sx={{ width: 120, height: 120, mx: "auto", mt: 1 }}
          />
        </Box>
      )}
    </Paper>
  );
};
