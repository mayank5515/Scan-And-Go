const User = require("../models/User.model");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpValidateTime = require("../utils/otpValidateTime");

// const accountSID = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSID, authToken, process.env);
const accountSID = "ACb4041dca060440a4a7e08f3bf1c200bd";
const authToken = "0a93084d1b14a858fcf5cc75204043d4";
const twilioPhoneNumber = "+12037796781";
const twilioClient = require("twilio")(accountSID, authToken);
// console.log(twilioClient);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + 60 * 60 * 1000,
  });
};

const createSendToken = (res, user) => {
  const token = signToken(user._id);
  //SENDING JWT VIA A COOKIE
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true, //browser will recieve , store and send back cookie but WONT BE ABLE TO ACCESS IT ANY WAY
  };
  //   if (process.env.NODE_ENV === "production") cookieOptions.secure = true; //WILL ONLY SEND COOKIE ON ENCRYPTED NETWORK
  console.log("JWT TOKEN: ", token);
  res.cookie("jwt", token, cookieOptions);
};

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
        otpExpiresIn: new Date(cDate.getTime()),
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
      body: `Your OTP is :${otp}`,
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
    if (await otpValidateTime(existingUser.otpExpiresIn)) {
      return res.status(400).json({
        status: "fail",
        message: "Your OTP has been expired , please request for new OTP",
      });
    }
    //IF EVERYTHING IS OK , SEND BACK JWT AS COOKIE (WE WILL USE THIS FOR FURTHER AUTHORIZATION (protect method ke through))
    console.log("EXISTING USER: ", existingUser);
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
