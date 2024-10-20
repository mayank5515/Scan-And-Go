const mongoose = require("mongoose");
const validator = require("validator");

const billSchema = new mongoose.Schema(
  {
    phone_number: {
      type: Number,
      required: [true, "A bill must have a phone number"],
      min: [10, "Phone number must be of 10 digits"],
      max: [10, "Phone number must be of 10 digits"],
    },
    customer_name: {
      type: String,
      required: [true, "A bill must have a customer name"],
    },
    shopping_list: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
