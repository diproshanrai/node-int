const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User registration function
exports.register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Check if username and password are provided
    if (!userName || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    console.log(req.body)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({ userName, password: hashedPassword });

    res.status(201).json({ message: "User is created", user });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

// User login function
exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the plain password with the hashed password stored in the database
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Return success message and the JWT token
    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};
