const Stock = require("../models/stock");

const registerStock = async (req, res) => {
  if (!req.body.cant || !req.body.cellar || !req.body.city)
    return res.status(400).send("Process failed: Incomplete data");

  let existingStock = await Stock.findOne({ cellar: req.body.cellar });
  if (existingStock)
    return res
      .status(400)
      .send("Process failed: The cellar stock is already registered");

  const stock = new Stock({
    cant: req.body.cant,
    cellar: req.body.cellar,
    city: req.body.city,
    dbStatus: true,
  });

  const result = await stock.save();
  if (!result) return res.status(400).send("Failed to register role");
  return res.status(200).send({ stock });
};

const listStock = async (req, res) => {
  let stock = await Stock.find({
    city: new RegExp(req.params["city"], "i"),
  }).exec();
  if (!stock || !stock.length === 0) return res.status(400).send("No city");
  return res.status(200).send({ stock });
};

module.exports = { registerStock, listStock };
