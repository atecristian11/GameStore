const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.ciudad ||
    !req.body.cedul ||
    !req.body.telefono
  )
    return res.status(400).sent("Process failed: Incomplete data");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res
      .status(400)
      .send("Process failed: The email user is already registered");

  let hash = await bcrypt.hash(req.body.password, 10); //con hash se encripta la clave con la libreria de bcrypt

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    ciudad: req.body.ciudad,
    cedul: req.body.cedul,
    telefono: req.body.telefono,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Failed to register user");
  //convertimos la info de la persona a ergistrar en algo encriptado
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
};

const listUser = async (req, res) => {
  let user = await User.find({
    name: new RegExp(req.params["name"], "i"),
  }).exec(); //el populate sirve para que para que nos muestre el rol pero desencriptado
  if (!user || !user.length === 0) return res.status(400).send("No users");
  return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
