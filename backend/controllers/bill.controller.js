const jwt = require("jsonwebtoken");
const Bill = require("../models/Bill.models");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "25m",
  });
};

const createSendToken = (res, statusCode, id) => {
  const token = signToken(id);
  //SENDING JWT VIA A COOKIE
  const cookieOptions = {
    expires: 25 * 60 * 1000,
    // httpOnly: true, //browser will recieve , store and send back cookie but WONT BE ABLE TO ACCESS IT ANY WAY
  };

  res.cookie("jwt", token, cookieOptions);

  // res.status(statusCode).json({
  //   status: "success",
  //   token,
  // });
};

//CREATE NEW BILL
//this will be called initially only
exports.createBill = async (req, res) => {
  try {
    const { phone_number, customer_name, shopping_list } = req.body;
    if (!req.body.phone_number) {
      return res.status(400).json({
        status: "fail",
        message: "Phone number is required",
      });
    }

    const newBill = await Bill.create({
      phone_number,
      customer_name,
      shopping_list,
    });

    //as new bill is created send jwt token as cookie
    createSendToken(res, 201, newBill._id); //this will be used to authenticate the customer and bill will be available for 25 mins for now

    res.status(201).json({
      status: "success",
      data: {
        newBill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//GET BILL
// NOTE: this will be called multiple times in the frontend to see if anything was updated in shpping list
//we will do this using socket.io
exports.getBill = async (req, res) => {
  try {
    console.log("FROM GET BILL: ", req.params);
    const bill = await Bill.findById(req.params.id);
    console.log("BILL: ", bill);
    res.status(200).json({
      status: "success",
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};
