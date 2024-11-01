const Bill = require("../models/Bill.models");

//CREATE NEW BILL
//this will be called initially only
exports.createActiveBill = async (req, res) => {
  try {
    // console.log("REQ USER: ", req.user);
    // console.log("HEADERS: ", req.headers);
    if (req.user && req.user.activeBill === null) {
      const newBill = await Bill.findOneAndUpdate(
        {
          customer_id: req.user._id,
        },
        {
          customer_id: req.user._id,
          total_amount: 0,
          products: [],
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
      // console.log("NEW BILL: ", newBill);
      //UPDATE USER WITH ACTIVE BILL
      req.user.activeBill = newBill._id;
      await req.user.save();
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
    console.log("REQ USER: ", req.user);
    //
    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message: "No active bill found , Please create a bill first",
      });
    }
    const bill = await Bill.findById(req.user.activeBill);

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
