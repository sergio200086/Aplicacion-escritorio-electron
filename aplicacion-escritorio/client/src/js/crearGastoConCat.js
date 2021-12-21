const { ipcRenderer } = require("electron");
const { v4: uuidv4 } = require("uuid");

const { reemplazar } = require("../data");
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on(
    "crear-gasto-cat",
    async (evento, categoria, datosPerfil, inicioSesion) => {
      let boton = document.getElementById("btnCrearGasto");
      boton.addEventListener("click", async () => {
        let fecha = document.getElementById("fechaGasto");
        let desc = document.getElementById("descripcion");
        let montoGasto = document.getElementById("montoGasto");
        let alerta = document.getElementById("alerta");
        if (fecha.value == "" || montoGasto.value == isNaN) {
          alerta.innerHTML =
            "El valor del monto debe ser mayor a 0//// Corregir fecha de gasto";
        } else {
          let gasto = {
            fecha: fecha.value,
            descripcion: desc.value,
            valor: montoGasto.value,
          };
          let userId = uuidv4();
          console.log(datosPerfil);
          let index = datosPerfil.categoria.findIndex(
            (e) => e.nombreCat == categoria.nombreCat
          );
          console.log(categoria);
          gasto["idGasto"] = userId;
          gasto["gastoCat"] = datosPerfil.categoria[index].nombreCat;

          datosPerfil.categoria[index].gastos.push(gasto);
          await reemplazar(datosPerfil);
          console.log(categoria);
          ipcRenderer.send(
            "devolver-gastos-cat",
            categoria,
            datosPerfil,
            inicioSesion
          );
        }
      });
    }
  );
});
