const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllMembers,
  updatePassword,
} = require("../controllers/member.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.get("/", protect, admin, getAllMembers);
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, updatePassword);

module.exports = router;
