const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Blog = new Schema({
  title: String,
  content: String,
  authorID: ObjectId,
});

module.exports = mongoose.model("Blog", Blog);
