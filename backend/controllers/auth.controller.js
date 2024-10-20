const jwt = require("jsonwebtoken");
exports.protect = async (req, res, next) => {
  let token;
  //1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message:
        "Token for this bill is missing , please create new token again and re-add items to your cart",
    });
  }
  //2) Verification of token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
};
