const express = require("express");
const { getSocket } = require("../utils/socket");
const {
  addProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/product.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post((req, res) => {
    const io = getSocket(); // Get the io instance
    // console.log("IO FROM ROUTE", io);
    addProduct(req, res, io); //pass io to the controller
  });

router.route("/checkout").delete(deleteAllProducts);

module.exports = router;
