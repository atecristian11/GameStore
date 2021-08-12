const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  buyer: String, //comprador
  price: Number,
  idProduct: { type: mongoose.Schema.ObjectId, ref: "product" },
  idUser: { type: mongoose.Schema.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const sale = mongoose.model("sale", saleSchema);
module.exports = sale;
