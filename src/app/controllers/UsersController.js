const cloud = require("cloudinary").v2;
cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const User = require("../models/UserModel");

class UserController {
  //Get All users
  getUsers(req, res, next) {
    User.find({})
      .then((users) => res.json(users))
      .catch(next);
  }

  //Get specific user by id
  getUserById(req, res, next) {
    User.findById(req.params.id, (err, user) => {
      if (!err) {
        res.json(user);
      } else {
        next(err);
      }
    });
  }

  //Post avatar
  postUserAvatar(req, res, next) {
    // try {
    //   const uploadRes = await cloud.uploader.upload(req.body, {
    //     upload_preset: "react_blogs",
    //   });
    //   console.log(uploadRes);
    //   res.status(200).json("uploaded successfully");
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).json(error);
    // }
    // User.updateOne(req.user.id, { $set: { imageIRL: req.body } });
    User.findByIdAndUpdate(req.user.id, { imageIRL: req.body }, (err, docs) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(docs);
      }
    });
    // res.send("successful");
    // User.findById(req.user.id, (err, user) => {
    //   if (!err) {
    //     res.json(user);
    //   } else {
    //     next(err);
    //   }
    // });
  }
}

module.exports = new UserController();
