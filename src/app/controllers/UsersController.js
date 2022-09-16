const { cloud } = require("../../utils/cloudinary");
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
  async postUserAvatar(req, res, next) {
    try {
      const uploadRes = await cloud.uploader.unsigned_upload(
        req.body,
        "react_blogs"
      );
      console.log(uploadRes);
      res.status(200).json("uploaded successfully");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}

module.exports = new UserController();
