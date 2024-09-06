const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./post');
const User = require('./users');

const Comment = sequelize.define('Comment', {
  commentText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Postid: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Comment.belongsTo(Post, { foreignKey: 'Postid' });
Comment.belongsTo(User, { foreignKey: 'userid' });

module.exports = Comment;
