const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddle');
const commentcontroller = require('../controller/commentController');

router.post('/', authenticateToken, commentcontroller.postComment)
router.get('/', authenticateToken, commentcontroller.getComment)

module.exports = router;