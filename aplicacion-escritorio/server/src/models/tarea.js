const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: String,
  terminada: {
    type: Boolean,
    default: false,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tarea", TareaSchema);
