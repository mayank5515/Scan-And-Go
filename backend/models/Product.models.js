const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
  },
  unique_id: {
    type: String,
    required: [true, "A product must have a unique id"],
  },
  bill_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Bill",
    required: [true, "A product must have a bill id"],
  },
  cost_price: {
    type: Number,
    required: [true, "A product must have a cost price"],
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
