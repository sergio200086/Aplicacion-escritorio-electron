const { ipcRenderer } = require("electron");
const { v4: uuidv4 } = require("uuid");

const { reemplazar } = require("../data");
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on(
    "sin-cat",
    async (evento, categoria, datosPerfil, inicioSesion) => {
      let boton = document.getElementById("btnCrearGasto");
      boton.addEventListener("click", async () => {
        let fecha = document.getElementById("fechaGasto");
        let desc = document.getElementById("descripcion");
        let montoGasto = document.getElementById("montoGasto");
        let gasto = {
          fecha: fecha.value,
          descripcion: desc.value,
          valor: montoGasto.value,
        };
        let userId = uuidv4();
        console.log(datosPerfil);

        console.log(datosPerfil);
        gasto["idGasto"] = userId;
        datosPerfil.gastoSinCat.push(gasto);
        await reemplazar(datosPerfil);
        console.log(categoria);
        ipcRenderer.send("login", [categoria], inicioSesion);
      });
    }
  );
});
