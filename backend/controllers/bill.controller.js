const jwt = require("jsonwebtoken");

//CREATE NEW BILL
exports.createBill = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
