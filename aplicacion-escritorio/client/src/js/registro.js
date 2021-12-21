const { ipcRenderer } = require("electron");
const axios = require("axios");

const { cargarUsuarios, agregarUsuario } = require("../data");
const {
  crearUsuario,
  todosUsuarios,
} = require("../../../server/test-client/test-usuario");
let boton = document.getElementById("btnRegistro");

boton.addEventListener("click", async () => {
  let nombres = document.getElementById("nombres");
  let email = document.getElementById("correo");
  let pass = document.getElementById("contra");

  let alerta = document.getElementById("alerta");
  if (email.value == "" || pass.value == "") {
    alerta.classList.toggle("btn");
    alerta.classList.toggle("btn-danger");
  } else {
    let datosU = await cargarUsuarios();
    let usuarios = await todosUsuarios();
    console.log(`USUARIOS: ${usuarios}`);
    let datosRegistro = {
      nombres: nombres.value,
      email: email.value,
      pass: pass.value,
    };
    let creado = await agregarUsuario(usuarios, datosRegistro);
    if (creado) {
      await crearUsuario(nombres.value, email.value, pass.value);
      alerta.innerHTML = "Usuario creado exitosamente";
      alerta.classList.toggle("btn");
      alerta.classList.toggle("btn-success");
    } else {
      alerta.innerHTML = "Usuario ya existente";
      alerta.classList.toggle("btn");
      alerta.classList.toggle("btn-danger");
    }
  }
});
