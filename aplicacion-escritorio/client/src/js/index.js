const { ipcRenderer } = require("electron");
const axios = require("axios");

const {
  cargarUsuarios,
  comaparaInicioSesion,
  traerUsuario,
} = require("../data");

const {
  crearUsuario,
  todosUsuarios,
  obtenerUsuario,
} = require("../../../server/test-client/test-usuario");

let email = document.getElementById("email");
let pass = document.getElementById("pass");
let boton = document.getElementById("btnLogin");
let alert = document.getElementById("alert");
let registro = document.getElementById("registro");

registro.addEventListener("click", async () => {
  ipcRenderer.send("register");
});

boton.addEventListener("click", async () => {
  let datos = await todosUsuarios();
  console.log(datos);
  const datosInicioSesion = {
    email: email.value.toString(),
    pass: pass.value,
  };
  const validacion = await comaparaInicioSesion(datos, datosInicioSesion);
  console.log(validacion, "aaaaaaaaaa");
  if (validacion) {
    //¿Por qué "validacion" es un objeto?
    let usuario = [];
    usuario[0] = await traerUsuario(datos, datosInicioSesion);
    console.log(usuario);
    ipcRenderer.send("login", usuario, datosInicioSesion);
  } else {
    alert.classList.toggle("alert");
    alert.classList.toggle("alert-danger");
    alert.innerHTML = "Correo o contraseña incorrecta";
  }
});
