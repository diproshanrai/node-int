const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user"); // Import your User model
const router = express.Router();
const { JWT_SECRET } = process.env; // Ensure JWT_SECRET is set in your environment variables

// User registration (signup)
router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ userName, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

// User login (signin)
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" }); // Corrected to 401 Unauthorized
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

module.exports = router;
