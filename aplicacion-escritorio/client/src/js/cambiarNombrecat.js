const { ipcRenderer } = require("electron");

const { comprobarNombreCategoria, reemplazar } = require("../data");
let boton = document.getElementById("btnCambiarNombre");

ipcRenderer.on(
  "cambiar-nombre-categoria",
  async (evento, datos, datosPerfil, inicioSesion) => {
    boton.addEventListener("click", async () => {
      let nombreCategoria = document.getElementById("nombreCate").value;
      let alerta = document.getElementById("alerta");
      let nCat = {
        nuevoNombreCat: nombreCategoria,
      };
      let comprobante = await comprobarNombreCategoria(nCat, datosPerfil);
      console.log(comprobante);
      let indice = datosPerfil.categoria.findIndex(
        (e) => e.nombreCat == datos.nombreCat
      );
      if (comprobante) {
        datosPerfil.categoria[indice].nombreCat = nombreCategoria;
        await reemplazar(datosPerfil);
        datos.nombreCat = nombreCategoria;
        alerta.innerHTML = "Categoría cambiada exitosamente";
      } else {
        alerta.innerHTML = "Categoría no cambiada exitosamente";
        alerta.classList.toggle("alert");
        alerta.classList.toggle("alert-danger");
      }
      await ipcRenderer.send(
        "cerrar-ver-categoria",
        [datos],
        datosPerfil,
        inicioSesion
      );
    });
  }
);

// boton.addEventListener("click", async () => {
//   let nombres = document.getElementById("nombres");
//   let email = document.getElementById("correo");
//   let pass = document.getElementById("contra");

//   let alerta = document.getElementById("alerta");
//   if (email.value == "" || pass.value == "") {
//     alerta.classList.toggle("btn");
//     alerta.classList.toggle("btn-danger");
//   } else {
//     let datosU = await cargarUsuarios();
//     let datosRegistro = {
//       nombres: nombres.value,
//       email: email.value,
//       pass: pass.value,
//     };
//     let creado = await agregarUsuario(datosU, datosRegistro);
//     if (creado) {
//       alerta.innerHTML = "Usuario creado exitosamente";
//       alerta.classList.toggle("btn");
//       alerta.classList.toggle("btn-success");
//     } else {
//       alerta.innerHTML = "Usuario ya existente";
//       alerta.classList.toggle("btn");
//       alerta.classList.toggle("btn-danger");
//     }
//   }
// });
