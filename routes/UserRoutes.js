const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, birthday } = req.body;
    const user = new User({ name, email, birthday });
    await user.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get all users (optional)
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
