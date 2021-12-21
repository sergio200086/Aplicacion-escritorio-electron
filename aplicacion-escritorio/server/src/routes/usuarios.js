const express = require("express");
const Usuario = require("../models/usuario");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    return res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.post("/", async (req, res) => {
  //Este es el cuerpo de la petición
  const { nombres, email, pass } = req.body;

  try {
    const usuario = new Usuario({
      nombres,
      email,
      pass,
    });

    let resultado = await usuario.save();

    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const usuario = await Usuario.findById(id);

    return res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const nombre = req.body;
  try {
    const resultado = await Usuario.findOneAndUpdate(
      {
        _id: id,
      },
      nombre,
      { new: true }
    );
    return res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
