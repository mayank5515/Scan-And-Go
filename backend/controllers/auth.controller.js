const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.protect = async (req, res, next) => {
  try {
    let token;
    // console.log("headers", req.headers, req.headers.cookie);
    if (req.headers.cookie && req.headers.cookie.startsWith("jwt")) {
      token = req.headers.cookie.split("=")[1];
    }

    if (!token) {
      res.status(400).json({
        status: "fail",
        message: "You are not logged in , please log in to get access",
      });
    }
    console.log(req.headers.cookie.split("=")[1], token);

    //verify the jwt
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log("DECODED", decoded); //{ id: '671f4f2b26732b7688a96c1c', iat: 1730112202, exp: 1731845915133 }

    //AFTER JWT IS VERIFIED SEND BACK USER
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User belonging to this token no longer exists",
      });
    }
    //SENDING BACK USER
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    let message = "Something went very wrong";
    let statusCode = 500;
    if (err.name === "JsonWebTokenError") {
      message = "Invalid Token, Please log in again!";
      statusCode = 401;
    } else if (err.name === "TokenExpiredError") {
      message = "Your token has expired , please login again!";
      statusCode = 401;
    }

    res.status(statusCode).json({
      status: "error",
      message,
      error: err,
    });
  }
};
