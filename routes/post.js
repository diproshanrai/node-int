const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authenticateToken = require("../middleware/authMiddle");

router.post("/", authenticateToken, postController.createPost);
router.get("/", authenticateToken, postController.getPost);
module.exports = router;
