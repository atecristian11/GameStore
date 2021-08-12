const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  code: Number,
  description: String,
  idStock: { type: mongoose.Schema.ObjectId, ref: "stock" },
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const product = mongoose.model("product", productSchema);
module.exports = product;
