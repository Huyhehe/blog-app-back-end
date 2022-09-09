const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// salt round
const saltRounds = 10;
let refreshTokenStore = [];

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "1h",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "365d",
    }
  );
};

class AuthController {
  async registerUser(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //create new user
      const dateRegistered = Date.now();
      const newUser = await new User({
        name: req.body.name,
        userName: req.body.userName,
        password: hashed,
        email: req.body.email,
        dateRegistered,
      });

      await newUser.save();
      res.status(201).json("Registered successfully");
    } catch (error) {
      res.json(error);
    }
  }

  //LOGIN
  async login(req, res, next) {
    try {
      const loginUser = await User.findOne({ userName: req.body.userName });
      if (!loginUser) {
        res.status(404).json("User does not exist!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        loginUser.password
      );
      console.log(validPassword);
      if (!validPassword) {
        res.status(404).json("Wrong password!");
      }
      if (loginUser && validPassword) {
        const accessToken = generateAccessToken(loginUser);
        const refreshToken = generateRefreshToken(loginUser);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        const { password, ...others } = loginUser._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // CHECK TOKEN STILL VALID OR NOT
  checkTokenIsStillValid(req, res) {
    res.status(200).json("Token is still valid");
  }

  // REFRESH TOKEN
  requestRefreshToken(req, res) {
    // get the refresh token from user
    const refreshToken = req.cookies.refreshToken;
    // send error if there's not any refresh token
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Your token is not valid");
      }
      refreshTokenStore = refreshTokenStore.filter(
        (token) => token !== refreshToken
      );
      //create a new access token
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      refreshTokenStore.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  }

  logOut(req, res) {
    res.clearCookie("refreshToken");
    refreshTokenStore = refreshTokenStore.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Log out successfully");
  }
}

module.exports = new AuthController();
