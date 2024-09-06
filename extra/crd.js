const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();
const port = 3000;
const { itemSchema, itemsArray } = require("./validation");
const authenticateToken = require('./authMiddleware');
const auth = require('./auth');

// Step 1: Connect to the MySQL database
const sequelize = new Sequelize("dummyDB", "root", "namastenode", {
  host: "localhost",
  dialect: "mysql",
});

// Step 2: Define the Item model
const Item = sequelize.define("Item", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    defaultValue: "yoddhalab",
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Middleware to handle JSON requests
app.use(express.json());

// Step 3: Synchronize the models with the database (creates the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized and tables created!");
    app.listen(port, () => {
      console.log(`The server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

// Correctly mount the auth routes
app.use('/auth', auth);

// Step 5: Create a POST route to add new items (handling both single and bulk creation)
app.post("/items", async (req, res, next) => {
  try {
    let value;
    if (Array.isArray(req.body)) {
      const { error, value: validatedValue } = itemsArray.validate(req.body);
      if (error) return next(error);
      value = validatedValue;
    } else {
      const { error, value: validatedValue } = itemSchema.validate(req.body);
      if (error) return next(error);
      value = validatedValue;
    }

    if (Array.isArray(value)) {
      const items = await Item.bulkCreate(value);
      res.status(201).json(items); // Corrected to 201 Created
    } else {
      const item = await Item.create(value);
      res.status(201).json(item); // Corrected to 201 Created
    }
  } catch (error) {
    next(error);
  }
});

// Step 6: Create a DELETE route to remove an item by ID
app.delete("/items/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.destroy({ where: { id } });
    if (item) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Protect GET route with JWT middleware
app.get("/items", authenticateToken, async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Update route with validation and error handling
app.put("/items/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { error, value } = itemSchema.validate(req.body);
    if (error) return next(error);

    const [updated] = await Item.update(value, { where: { id } });
    if (updated) {
      const updatedItem = await Item.findOne({ where: { id } });
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: "Item not Found" });
    }
  } catch (error) {
    next(error);
  }
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const errorMessage = err.details && Array.isArray(err.details) && err.details[0]?.message
    ? `Something went wrong: ${err.details[0].message}`
    : "Something went wrong! Please try again later.";
  res.status(500).json({ error: errorMessage });
}

app.use(errorHandler);
