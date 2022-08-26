const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: { type: String, minLength: 6, required: true, unique: true },
  password: { type: String, minLength: 6, required: true },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", User);
