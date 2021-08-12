const User = require("../models/user");
const Product = require("../models/product");
const Sale = require("../models/sale");

const registerSale = async (req, res) => {
  if (!req.body.buyer || !req.body.price || !req.body.nombreproducto || !req.body.nombreusuario)
    return res.status(400).send("Process failed: Incomplete data");

  let existingSale = await Sale.findOne({ buyer: req.body.buyer });
  if (existingSale)
    return res
      .status(400)
      .send("Process failed: The buyer sale is already registered");

      const product = await Product.findOne({ name: req.body.nombreproducto });
      if (!product)
        return res.status(401).send("Process failed: Product not already exist");
    
      let user = await User.findOne({ name: req.body.nombreusuario });
      if (!user) return res.status(400).send("Process failed: user not exist");

  let sale = new Sale({
    buyer: req.body.buyer, //comprador
    price: req.body.price,
    idProduct: product._id,
    idUser: user._id,
    dbstatus: true,
  });

  const result = await sale.save();
  if(!result) return res.status(400).send("Failed to register role");
  return res.status(200).send({sale});
};

const listSale = async (req, res) => {
  let sale = await Sale.find({ buyer: new RegExp(req.params["buyer"], "i") })
    .populate("idProduct").populate("idUser")
    .exec(); //el populate sirve para que para que nos muestre el rol pero desencriptado
  if (!sale || !sale.length === 0) return res.status(400).send("No sale");
  return res.status(200).send({ sale });
};

module.exports = { registerSale, listSale };
