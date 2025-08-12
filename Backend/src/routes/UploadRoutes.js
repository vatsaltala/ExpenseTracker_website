import express from "express";
import upload from "../config/multer";

const router = express.Router();

// POST request to upload image
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
