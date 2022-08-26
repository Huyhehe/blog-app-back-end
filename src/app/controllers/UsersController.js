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
}

module.exports = new UserController();
