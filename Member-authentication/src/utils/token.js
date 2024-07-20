const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign(payload, "jwt_secret", { expiresIn: "1h" });
};
