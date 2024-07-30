const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Member = require("../models/member");

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (/\s/.test(password)) {
    return "Password cannot contain spaces";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!passwordRegex.test(password)) {
    return "Password must have a special character, at least one uppercase letter, and at least one number";
  }
  return null;
};

exports.register = async (req, res) => {
  try {
    const { memberName, password, YOB, name } = req.body;

    if (memberName.includes(" ")) {
      return res
        .status(400)
        .send({ msg: "Member's name cannot contain spaces" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).send({ msg: passwordError });
    }

    const user = await Member.findOne({ memberName });

    const nameUser = await Member.findOne({ name }).populate("name");

    if (nameUser) {
      return res.status(400).send({ msg: "Name already exists" });
    }

    if (user) {
      return res.status(400).send({ msg: "Member's name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Member({
      memberName,
      password: hashedPassword,
      YOB,
      name,
    });
    await newUser.save();

    res.json({ success: true, data: newUser });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { memberName, password } = req.body;
  try {
    const user = await Member.findOne({ memberName });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
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
