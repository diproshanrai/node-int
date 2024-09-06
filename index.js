const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./config/database");
const authRoutes = require("./routes/authroutes");
const postRoutes = require("./routes/post");
const errorHandler = require("./utils/errorhandler");
const homeController = require("./controller/home");
const commentRoutes = require("./routes/comment");

app.use(express.json());

app.get("/", homeController.home);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized and tables created!");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
