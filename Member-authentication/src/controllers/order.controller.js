const Watch = require("../models/watch");
const Order = require("../models/order");
const OrderDetail = require("../models/order_detail");

exports.AddToCart = async (req, res, next) => {
  try {
    const { watchId, quantity } = req.body;
    const { userId } = req.user;

    if (!watchId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const watch = await Watch.findById(watchId);
    if (!watch) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found" });
    }

    
  } catch (error) {
    next(error);
  }
};
