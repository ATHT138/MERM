const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderDetailSchema = require("./order_detail").schema;

const orderSchema = new Schema({
  orderStatus: { type: String, required: true },
  orderDetails: [orderDetailSchema],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: { type: Number, required: true },
  orderNumber: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
