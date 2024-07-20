const express = require("express");
const {
  createWatch,
  getAllWatches,
  getWatchById,
  updateWatch,
  deleteWatch,
} = require("../controllers/watch.controller");
const { postComment } = require("../controllers/comment.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getAllWatches).post(protect, admin, createWatch);

router
  .route("/:watchId")
  .get(getWatchById)
  .put(protect, admin, updateWatch)
  .delete(protect, admin, deleteWatch);

module.exports = router;
