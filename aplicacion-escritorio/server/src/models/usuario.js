const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  categoria: [],
  gastoSinCat: [],
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
