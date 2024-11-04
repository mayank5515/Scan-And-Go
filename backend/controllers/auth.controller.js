const User = require("../models/User.model");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpValidateTime = require("../utils/otpValidateTime");
const { promisify } = require("util");

// const accountSID = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSID, authToken, process.env);
const accountSID = "ACb4041dca060440a4a7e08f3bf1c200bd";
const authToken = "0a93084d1b14a858fcf5cc75204043d4";
const twilioPhoneNumber = "+12037796781";
const twilioClient = require("twilio")(accountSID, authToken);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

const createSendToken = (res, user) => {
  const token = signToken(user._id);
  //SENDING JWT VIA A COOKIE
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
    httpOnly: true, //browser will recieve , store and send back cookie but WONT BE ABLE TO ACCESS IT ANY WAY
  };
  //   if (process.env.NODE_ENV === "production") cookieOptions.secure = true; //WILL ONLY SEND COOKIE ON ENCRYPTED NETWORK
  console.log("JWT TOKEN: ", token);
  res.cookie("jwt", token, cookieOptions);
};

/////////////////////////////////////////////////////////////////////////////////
//SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    //GENERATE OTP
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    //ENCRYPT OTP AND SAVE IT IN DATABASE
    const encryptedOTP = await bcrypt.hash(otp, 10);

    const cDate = new Date();
    //IF USER EXISTS UPDATE OTP AND OTP EXPIRES IN FIELD , ELSE CREATE NEW USER WITH THESE VALUE (that's what upsert is used for)

    const user = await User.findOneAndUpdate(
      { phone_number },
      {
        otp: encryptedOTP,
        otpExpiresIn: new Date(cDate.getTime() + 5 * 60 * 1000), //expires in 5 min
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("OTP is : ", otp);
    //SEND OTP TO CLIENT USING TWILIO
    await twilioClient.messages.create({
      body: `Your OTP is :${otp} , your OTP is valid for 5 mins`,
      to: phone_number,
      from: twilioPhoneNumber,
    });

    res.status(200).json({
      status: "success",
      message: `OTP sent successfully to ${phone_number}`,
      encryptedOTP,
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error: err,
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////
//VERIFY OTP AND SEND BACK JWT AS COOKIE
exports.verifyOtp = async (req, res) => {
  try {
    const { phone_number, otp } = req.body;

    const existingUser = await User.findOne({
      phone_number,
    });
    //IF USER DOESNOT EXIST WITH THIS PHONE NUMBER
    if (!existingUser) {
      return res.status(401).json({
        status: "fail",
        message: `User with this phone number : ${phone_number} does not exist !!`,
      });
    }
    //IF INVALID OTP
    if (!(await bcrypt.compare(otp, existingUser.otp))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid OTP , please provide valid OTP!!",
      });
    }
    //IF OTP EXPIRED
    if (!(await otpValidateTime(existingUser.otpExpiresIn))) {
      return res.status(400).json({
        status: "fail",
        message: "Your OTP has been expired , please request for new OTP",
      });
    }
    //IF EVERYTHING IS OK , SEND BACK JWT AS COOKIE (WE WILL USE THIS FOR FURTHER AUTHORIZATION (protect method ke through))
    // console.log("EXISTING USER: ", existingUser);
    createSendToken(res, existingUser);

    res.status(200).json({
      status: "success",
      message: "OTP verified successfully , JWT Token sent as cookie",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error: err,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////
//PROTECT ROUTE -> AUTHORIZATION
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
    // console.log(req.headers.cookie.split("=")[1], token);

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

// console.log("cdate: ", cDate);
// console.log("cDate in milliseconds", cDate.getTime());
// console.log("15 mins ahead in mill", cDate.getTime() + 15 * 60 * 1000);
// console.log(
//   "15 mins ahead in date",
//   new Date(cDate.getTime() + 15 * 60 * 1000)
// );
