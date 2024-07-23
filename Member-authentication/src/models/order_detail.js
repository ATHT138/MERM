const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
  watch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Watch",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
