const Comment = require("../models/comment");

const postComment = async (req, res, next) => {
  try {
    const { commentText, Postid, userid } = req.body;
    const comment = await Comment.create({ commentText, Postid, userid });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findAll();
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = {postComment, getComment};
