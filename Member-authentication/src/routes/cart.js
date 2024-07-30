const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
  checkout,
} = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/").get(protect, getCart);
router.route("/add-to-cart").post(protect, addToCart);
router
  .route("/update-cart/:watchId")
  .put(protect, updateCart)
  .delete(protect, deleteFromCart);

router.route("/checkout/:id").delete(protect, checkout);

module.exports = router;
