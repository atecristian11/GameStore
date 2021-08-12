const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Product = require("./routes/product");
const Sale = require("./routes/sale");
const Stock = require("./routes/stock");
const User = require("./routes/user");
require("dotenv").config();

const game = express();

game.use(express.json());
game.use(cors());
game.use("/api/product", Product);
game.use("/api/sale", Sale);
game.use("/api/stock", Stock);
game.use("/api/user", User);

game.listen(process.env.PORT, () =>
  console.log("Backend server running OK, on port: ", process.env.PORT)
);

dbConnection();
