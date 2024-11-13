const instace = require("../server");

exports.paymentCheckout = async (req, res) => {
  try {
    const options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    //response will show payment is due , amount paid:0
    const order = razorpayInstance.orders.create(options);
    console.log(order);
    res.status(200).json({
      status: "success",
      message: "Here is the order object",
      order,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      error: err,
      callStack: err.stack,
    });
  }
};
