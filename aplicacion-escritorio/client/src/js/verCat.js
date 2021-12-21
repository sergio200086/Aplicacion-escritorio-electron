const { ipcRenderer } = require("electron");
const { traerUsuario, cargarUsuarios } = require("../data");
// const { refrescante } = require("./main");

let boton = document.getElementById("btnVerCat");

async function todo(datos, inicioSesion) {
  // datos es el usuario individual e "inicioSesion" son el correo y contraseña usados
  let seleccionCat = document.getElementById("seleccionCat");
  while (seleccionCat.firstChild) {
    seleccionCat.removeChild(seleccionCat.firstChild);
  }
  datos.categoria.forEach((element, index) => {
    let option = document.createElement("option");
    option.value = `${element.nombreCat}`;
    option.innerHTML = element.nombreCat;
    seleccionCat.appendChild(option);
  });

  boton.addEventListener("click", async () => {
    console.log(seleccionCat.value);
    const filtrado = datos.categoria.filter((e) => {
      return e.nombreCat == seleccionCat.value;
    });
    console.log(filtrado, "FILTRO");
    console.log(datos);
    console.log(inicioSesion);
    ipcRenderer.send("ver-categoria", filtrado, datos, inicioSesion);
  });
}

ipcRenderer.on("login-exitoso", async (evento, datosLogin, inicioSesion) => {
  console.log(datosLogin);
  console.log(inicioSesion);
  let usuarios = await cargarUsuarios();
  usuario = await traerUsuario(usuarios, datosLogin);
  console.log(usuario);
  await todo(usuario, inicioSesion);
});
// ipcRenderer.on("refresco", async (evento, datos, inicioSesion) => {
//   console.log(datos, "Datos nuevos despues de eliminar la categoría");
//   console.log("entramos al refresco vida hp");
//   await todo(datos, inicioSesion);
// });
