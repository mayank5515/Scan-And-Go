const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiresIn: {
    type: Date,
    default: Date.now(),
    get: (otpExpiresIn) => otpExpiresIn.getTime(),
    set: (otpExpiresIn) => new Date(otpExpiresIn),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
