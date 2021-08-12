const express = require("express");
const router = express.Router(); //con esta se manipulan rutas para asi acceder a las api
const StockController = require("../controllers/stock");

router.post("/registerStock", StockController.registerStock);
router.get("/listStock/:city?", StockController.listStock);

module.exports = router;
