const Bill = require("../models/Bill.models");

//CREATE NEW BILL
//this will be called initially only
exports.createActiveBill = async (req, res) => {
  try {
    console.log("REQ USER: ", req.user.activeBill !== null, !req.user);

    if (req.user && req.user.activeBill === null) {
      const newBill = await Bill.create({
        customer_id: req.user._id,
        products: [],
        total_amount: 0,
      });
      // console.log("NEW BILL: ", newBill);
      //UPDATE USER WITH ACTIVE BILL , if only user doesnot have any active bill
      req.user.activeBill = newBill._id;
      await req.user.save();
    }

    if (req.user.activeBill !== null) {
      console.log(
        "USER ALREADY HAVE AN ACTIVE BILL , PLEASE REMOVE THAT FIRST"
      );
    }
    res.status(200).json({
      status: "success",
      message: "Bill created successfully",
      data: {
        bill: req.user.activeBill,
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

//NOTE: user must be logged in , only then we can getActiveBill
//NOTE: maybe at the end send kr denge ye activeBill and getAllProducts waale controller se saare products for specific bill hee send krenge hr refetching m ,
exports.getActiveBill = async (req, res) => {
  try {
    // console.log("REQ USER: ", req.user);
    //
    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message: "No active bill found , Please create a bill first",
      });
    }
    const bill = await Bill.findById(req.user.activeBill);
    if (bill.products.length === 0) {
      bill.total_amount = 0;
      await bill.save();
    }

    res.status(200).json({
      status: "success",
      message: "Bill fetched successfully",
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      error: err,
    });
  }
};
