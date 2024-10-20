const express = require("express");
const {
  addProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);

router.route("/checkout").delete(deleteAllProducts);

module.exports = router;
