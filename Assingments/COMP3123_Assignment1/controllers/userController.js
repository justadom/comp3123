const bcrypt = require('bcryptjs');
const User = require('../models/User');

// ✅ POST /api/v1/user/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully.",
      user_id: user._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// ✅ POST /api/v1/user/login
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid Username and password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid Username and password" });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
