const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");

const mongoose = require("mongoose");

class BlogsController {
  //[GET] /blogs
  async index(req, res, next) {
    try {
      const blogList = await Blog.find({}).lean();
      const blogs = await Promise.all(
        blogList.map(async (blog) => {
          try {
            const user = await User.findById(blog.authorID);
            blog.authorName = user.name;
            return blog;
          } catch (error) {
            next(error);
          }
        })
      );
      res.json(blogs);
    } catch (error) {
      next(error);
    }
  }
  specific(req, res) {
    console.log(req.params);
    res.send(`hello i'm ${req.params.id}`);
  }

  add(req, res) {
    const newBlog = new Blog(req.body);
    newBlog.authorID = mongoose.Types.ObjectId(newBlog.authorID);
    newBlog.save();
    res.send("Added");
  }

  async delete(req, res) {
    const deletedID = mongoose.Types.ObjectId(req.params);
    try {
      const del = await Blog.deleteOne({ _id: deletedID });
      console.log(del);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new BlogsController();
