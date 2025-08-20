const express = require("express");
const upload = require("../config/multer");
const authMiddleware  = require("../middleware/AuthMiddleware")
const {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  getprofilebyuserid
} = require("../controllers/Profilecontroller");

const router = express.Router();

// Create profile (upload + save to DB)
router.post("/:id",authMiddleware.authMiddleware, upload.single("image"), createProfile);

// Get all profiles
router.get("/",authMiddleware.authMiddleware, getProfiles);

// Update profile
router.put("/:id",authMiddleware.authMiddleware, upload.single("image"), updateProfile);

// Delete profile
router.delete("/:id",authMiddleware.authMiddleware, deleteProfile);

router.get("/:id",authMiddleware.authMiddleware, getprofilebyuserid)

module.exports = router;
