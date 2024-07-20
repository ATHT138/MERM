const jwt = require("jsonwebtoken");
const Member = require("../models/member");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Member.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Not authorized as an admin" });
  }
};

exports.user = (req, res, next) => {
  if (req.user && !req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Not authorized as a user" });
  }
};
