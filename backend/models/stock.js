const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  cant: Number,
  cellar: String,
  city: String,
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const stock = mongoose.model("stock", stockSchema);
module.exports = stock;
