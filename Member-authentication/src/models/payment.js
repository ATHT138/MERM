const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paymentDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  paymentNumber: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
