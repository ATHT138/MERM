const bcrypt = require("bcrypt");
const Member = require("../models/member");
const jwt = require("jsonwebtoken");

exports.updateProfile = async (req, res) => {
  const { name, YOB } = req.body;
  try {
    const user = await Member.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (name) user.name = name;
    if (YOB) user.YOB = YOB;

    await user.save();

    const payload = {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    req.session.token = token;
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  try {
    const user = await Member.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if password and newPassword are provided
    if (!password || !newPassword) {
      return res
        .status(400)
        .json({ msg: "Please provide password and newPassword" });
    }
    // Check if password and newPassword are the same
    if (password === newPassword) {
      return res
        .status(400)
        .json({ msg: "New password cannot be the same as old password" });
    }

    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }

    // Update password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await Member.findById(req.user.id).select("-password");

    console.log(req.user.id);
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select("-password");
    res.json({ msg: "All members", data: members });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
