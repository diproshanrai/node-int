
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
  