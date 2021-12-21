// Importa ExpressJS
const express = require("express");
const Tarea = require("../models/tarea");

// Crea el router
const router = express.Router();

// Rutas
let listaTareas = [
  { id: 1, nombre: "Running" },
  { id: 2, nombre: "Programming" },
  { id: 3, nombre: "Watch TV" },
];
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find();

    return res.status(200).send(tareas);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const tarea = await Tarea.findById(id);

    return res.status(200).send(tarea);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});
//Para usar post
router.post("/", async (req, res) => {
  //Cuerpo de la petición
  const { titulo, descripcion, terminada, fecha } = req.body;

  try {
    const tarea = new Tarea({
      titulo: titulo,
      descripcion: descripcion,
      terminada: terminada,
      fecha: fecha,
    });
    let resultado = await tarea.save();

    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
  // listaTareas.push(tarea);

  // res.status(201).send(tarea);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const nombre = req.body;

  try {
    const resultado = await Tarea.findOneAndUpdate(
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await Tarea.deleteOne({
      _id: id,
    });

    return res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
