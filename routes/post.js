const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authenticateToken = require("../middleware/authMiddle");
const upload = require('../config/multerConfig')


router.post("/", authenticateToken, postController.createPost);
router.get("/", authenticateToken, postController.getPost);

router.post("/upload", authenticateToken, upload.single("image"), postController.uploadPostImage);



module.exports = router;
