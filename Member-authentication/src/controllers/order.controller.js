const Order = require("../models/order");
const Watch = require("../models/watch");

exports.addToCart = async (req, res, next) => {
  try {
    const { watchId, quantity } = req.body;
    const { id } = req.user;

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

    let cart = await Order.findOne({ user: id, isOrder: false });

    if (!cart) {
      cart = await Order.create({
        orderDetails: [
          { watch: watchId, quantity: quantity, price: watch.price },
        ],
        user: id,
        isOrder: false,
        total: watch.price * quantity,
      });

      return res.status(201).json({ success: true, data: cart });
    }

    const orderDetailIndex = cart.orderDetails.findIndex(
      (item) => item.watch.toString() === watchId
    );

    if (orderDetailIndex >= 0) {
      // Watch already exists in order, update quantity
      cart.orderDetails[orderDetailIndex].quantity += quantity;
      cart.total += watch.price * quantity;
    } else {
      // Watch does not exist in order, add new
      cart.orderDetails.push({
        watch: watchId,
        quantity: quantity,
        price: watch.price,
      });
      cart.total += watch.price * quantity;
    }

    await cart.save();

    return res.status(201).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const { id } = req.user;

    const cart = await Order.findOne({ user: id, isOrder: false }).populate(
      "orderDetails.watch",
      "watchName price image"
    );

    if (!cart) {
      return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const { quantity } = req.body;
    const { id } = req.user;

    if (!watchId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const cart = await Order.findOne({ user: id, isOrder: false });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    const orderDetail = cart.orderDetails.find(
      (detail) => detail.watch.toString() === watchId
    );

    if (!orderDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found in cart." });
    }

    // Update the quantity of the watch
    orderDetail.quantity = quantity;

    cart.orderDetails = cart.orderDetails.map((detail) => {
      return detail.watch.toString() === watchId ? orderDetail : detail;
    });
    // Recalculate the total price of the cart
    cart.total = cart.orderDetails.reduce((acc, detail) => {
      return acc + detail.price * detail.quantity;
    }, 0);

    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Cart updated successfully.", cart });
  } catch (error) {
    next(error);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const { id } = req.user;

    if (!watchId) {
      return res
        .status(400)
        .json({ success: false, message: "Watch ID is required." });
    }

    const cart = await Order.findOne({ user: id, isOrder: false });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    const orderDetailIndex = cart.orderDetails.findIndex(
      (detail) => detail.watch.toString() === watchId
    );

    if (orderDetailIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Watch not found in cart." });
    }

    cart.orderDetails.splice(orderDetailIndex, 1);

    cart.total = cart.orderDetails.reduce((acc, detail) => {
      return acc + detail.price * detail.quantity;
    }, 0);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Watch removed from cart successfully.",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cart = await Order.findById(id);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    await Order.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    next(error);
  }
};
