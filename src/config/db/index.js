const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog_dev");
    console.log("connected");
  } catch (e) {
    console.log("failed");
  }
};

module.exports = { connect };
