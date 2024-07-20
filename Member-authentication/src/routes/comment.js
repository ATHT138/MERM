const express = require("express");
const {
  postComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/:watchId").post(protect, postComment);
router
  .route("/:watchId/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
