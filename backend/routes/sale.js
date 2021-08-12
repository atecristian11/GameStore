const express = require("express");
const router = express.Router(); //con esta se manipulan rutas para asi acceder a las api
const SaleController = require("../controllers/sale");

router.post("/registerSale", SaleController.registerSale);
router.get("/listSale/:buyer?", SaleController.listSale);

module.exports = router;
