const Stock = require("../models/stock");
const Product = require("../models/product");

const registerProduct = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.code ||
    !req.body.description ||
    !req.body.cityStock )
    return res.status(401).send("Process failed: Incomplete data");

  const existingProduct = await Product.findOne({ code: req.body.code });
  if (existingProduct)
  return res.status(401).send("Process failed: Product already exist");

  let stock = await Stock.findOne({ city: req.body.cityStock });
  if (!stock)
    return res.status(400).send("Process failed: No stock was assigned");

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    code: req.body.code,
    description: req.body.description,
    idStock: stock._id,
    dbStatus: true,
  });

  const result = await product.save();
  if (!result) return res.status(401).send("Failed to register product");
  return res.status(200).send({ product });
};

const listProduct = async (req, res) => {
  let product = await Product.find({
    name: new RegExp(req.params["name"], "i"),
  })
    .populate("idStock")
    .exec(); //el populate sirve para que para que nos muestre el rol pero desencriptado
  if (!product || !product.length === 0)
    return res.status(400).send("No product");
  return res.status(200).send({ product });
};

module.exports = { registerProduct, listProduct };
