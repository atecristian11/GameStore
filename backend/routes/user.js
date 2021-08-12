const express = require("express");
const router = express.Router(); //con esta se manipulan rutas para asi acceder a las api
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.get("/listUser/:name?", UserController.listUser);

module.exports = router;