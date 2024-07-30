const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderDetailSchema = require("./order_detail");

const orderSchema = new Schema(
  {
    orderDetails: [{ type: orderDetailSchema }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isOrder: { type: Boolean, default: false, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
