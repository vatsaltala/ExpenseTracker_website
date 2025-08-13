const express = require("express");
const upload = require("../config/multer");
const {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile
} = require("../controllers/Profilecontroller");

const router = express.Router();

// Create profile (upload + save to DB)
router.post("/", upload.single("image"), createProfile);

// Get all profiles
router.get("/", getProfiles);

// Update profile
router.put("/:id", upload.single("image"), updateProfile);

// Delete profile
router.delete("/:id", deleteProfile);

module.exports = router;
