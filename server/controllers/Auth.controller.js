const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const User = require("../models/User.model");

const createError = require("../utils/error");

const JWT_SEC = { config };

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
      username: savedUser.username,
    };

    const token = jwt.sign(payload, JWT_SEC, { expiresIn: "1d" });

    const { password, ...details } = savedUser._doc;

    res.status(200).json({ ...details, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found."));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, JWT_SEC, { expiresIn: "1d" });

    const { password, ...details } = user._doc;

    res.status(200).json({ ...details, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
