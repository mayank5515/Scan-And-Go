//NOTE: YHA PE DATA ESP32 se aaega and hum usko uske respective bill m dalenge

const Product = require("../models/Product.models");
//GET ALL PRODUCTS -> DYNAMIC IN NATURE USING SOCKET.IO
exports.getAllProducts = async (req, res) => {
  try {
    //BASICALLY WE NEED TO GROUP BY unique_id and then count the number of occurences of each product
    //and send back all products with their respective quantities
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$unique_id", // Group by product ID or another unique field
          quantity: { $sum: 1 }, // Count occurrences of each product
          productDetails: { $first: "$$ROOT" }, // Get product details
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field if you want
          productDetails: 1, // Include the product details
          quantity: 1, // Include the quantity field
        },
      },
    ]);
    //to find total cost of all products
    const totalCostAggregate = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$cost_price" },
        },
      },
    ]);

    const totalCost = totalCostAggregate[0].totalCost; // TOTAL COST:  [ { _id: null, totalCost: 656 } ]
    console.log(`GET REQUEST made :  ${new Date()}`);
    // console.log("TOTAL COST: ", totalCost);

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
      total: totalCost,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//ADD NEW PRODUCT
exports.addProduct = async (req, res, io) => {
  try {
    // console.log("IO FROM ADD PRODUCT", io); // Check if io is defined
    //ALERT: product aaega kha se ? req.body ? ya koi aur jagah se ?
    const { unique_id, product_name, cost_price } = req.body;
    if (
      !req.body ||
      !req.body.unique_id ||
      !req.body.product_name ||
      !req.body.cost_price
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Product is required , please mention all the details (unique_id, product_name, cost_price)",
      });
    }
    //if product already exists ? then check how many times it has been added

    // const countOfProduct = await Product.aggregate([
    //   { $match: { unique_id: req.body.unique_id } },
    //   { $group: { _id: "$unique_id", countDocuments: { $sum: 1 } } },
    // ]);

    const newProduct = await Product.create({
      unique_id,
      product_name,
      cost_price,
    });

    // Emit the event to notify clients that a product was added
    if (io) {
      // Check if io is defined before calling emit
      io.emit("productAdded"); // Emit the event to all connected clients
    } else {
      console.error("Socket.io instance is undefined.");
    }
    res.status(201).json({
      status: "success",
      data: {
        data: newProduct,
        // quantity: countOfProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//DELETE ALL PRODUCTS
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
