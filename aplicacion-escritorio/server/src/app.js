// Importa ExpressJS

const express = require("express");
const { Mongoose } = require("mongoose");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

console.log(process.env.CONEXION_MONGODB);

const tareasRoute = require("./routes/tareas");
const usuariosRoute = require("./routes/usuarios");

// Crea la aplicación
const app = express();

//Permite leer el body de las peticiones
app.use(express.json());

//habuiilita peticiones desde servidores remotes
app.use(cors());

// Moddleware de tareas
app.use("/tareas", tareasRoute);
app.use("/usuarios", usuariosRoute);

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido al API");
});

mongoose.connect(
  process.env.CONEXION_MONGODB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },

  () => {
    console.log("Conectado a la base de datos :D");
  }
);

// Ejecuta el servidor
app.listen(3000);
