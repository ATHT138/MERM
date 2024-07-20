const express = require("express");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getAllBrands).post(protect, admin, createBrand);

router
  .route("/:brandId")
  .get(getBrandById)
  .put(protect, admin, updateBrand)
  .delete(protect, admin, deleteBrand);

module.exports = router;
