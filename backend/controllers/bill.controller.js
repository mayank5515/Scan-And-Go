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
