// const Post = require('../models/post');

// Example of creating a new post
// exports.createPost = async (req, res, next) => {
//   try {
//    // Correct usage of create without new keyword
//     const post = await Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       userId: req.body.userId // Assuming userId is sent in the request
//     });

//     res.status(201).json(post);
//   } catch (error) {
//     next(error); // Proper error handling
//   }
// };

const Post = require('../models/post');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next)=>{
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch(error){
    next();
  }
};

// Add a new function to handle file uploads
exports.uploadPostImage = (req, res, next) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // File is successfully uploaded
    res.status(201).json({ message: 'File uploaded successfully!', file: req.file });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

// Add more controller functions as needed.
