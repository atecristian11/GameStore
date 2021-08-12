const express = require("express");
const router = express.Router(); //con esta se manipulan rutas para asi acceder a las api
const ProductController = require("../controllers/product");

router.post("/registerProduct", ProductController.registerProduct);
router.get("/listProduct/:name?", ProductController.listProduct);

module.exports = router;
