const { ipcRenderer } = require("electron");

const { eliminarCategoria, reemplazar } = require("../data");
const { eliminarGasto, gastos } = require("../gastosMenu");
document.addEventListener("DOMContentLoaded", async () => {
  async function todo(datos, datosPerfil, inicioSesion) {
    console.log(datos); //Categoria seleccionada
    console.log("pppppppp");
    console.log(datosPerfil); //Perfil en objeto

    let h2 = document.getElementById("reporte");
    h2.textContent = "";
    h2.innerHTML = "";

    h2.textContent = `Reporte de Gastos de la categoría ${datos.nombreCat}`;

    let Tbodytablaprincipal = document.getElementById("Tbodytablaprincipal");
    // Obtener todos los gastos con categoria
    while (Tbodytablaprincipal.firstChild) {
      Tbodytablaprincipal.removeChild(Tbodytablaprincipal.firstChild);
    }
    console.log(datos.gastos, "---------aaaa");
    datos.gastos.forEach((element1, index) => {
      console.log(element1);
      let tr = document.createElement("tr");
      tr.id = index;
      let td1 = document.createElement("td");
      td1.innerHTML = `<input type="checkbox" name="check" id="${element1.idGasto}">`;
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.textContent = element1.descripcion;
      tr.appendChild(td2);
      let td3 = document.createElement("td");
      td3.textContent = element1.gastoCat;
      tr.appendChild(td3);
      let td4 = document.createElement("td");
      td4.textContent = element1.valor;
      tr.appendChild(td4);
      let td5 = document.createElement("td");
      td5.textContent = element1.fecha;
      tr.appendChild(td5);

      Tbodytablaprincipal.appendChild(tr);
    });

    let botonEditarCat = document.getElementById("editarCat");
    botonEditarCat.addEventListener("click", async () => {
      ipcRenderer.send(
        "cambiar-nombre-categoria",
        datos,
        datosPerfil,
        inicioSesion
      );
    });

    let crearGasto = document.getElementById("crearGasto");
    crearGasto.addEventListener("click", async () => {
      console.log(datos);
      ipcRenderer.send("crear-gasto-con-cat", datos, datosPerfil, inicioSesion);
    });

    let eliminarCatGastos = document.getElementById("eliminarCatGastos");
    eliminarCatGastos.addEventListener("click", async () => {
      let indice = datosPerfil.categoria.findIndex(
        (e) => e.nombreCat == datos.nombreCat
      );

      let a = await eliminarCategoria(datosPerfil, true, indice);
      console.log(a);
      //ipcRenderer.send("redireccion", datos, inicioSesion);
      ipcRenderer.send("eliminar-categoria", datos, datosPerfil);
    });

    let eliminarSinGastos = document.getElementById("eliminarSinGastos");
    eliminarSinGastos.addEventListener("click", async () => {
      let indice = datosPerfil.categoria.findIndex(
        (e) => e.nombreCat == datos.nombreCat
      );
      let a = await eliminarCategoria(datosPerfil, false, indice);
      console.log(a);
      ipcRenderer.send("redireccion", datos, inicioSesion);
    });

    let btnEliminarGasto = document.getElementById("btnEliminarGasto");
    btnEliminarGasto.addEventListener("click", async () => {
      let check = document.querySelectorAll("input[name='check']");
      console.log(datosPerfil, "______________");
      check.forEach(async (element, index) => {
        if (element.checked == true) {
          let elementoE = document.getElementById(index);
          let gasto = await gastos(datosPerfil);
          console.log(element);
          let nUsuario = await eliminarGasto(
            element.id,
            datosPerfil,
            gasto,
            true,
            1
          );
          console.log("NUEVO USUARIO", nUsuario);
          await reemplazar(nUsuario);

          Tbodytablaprincipal.removeChild(elementoE);
          // console.log(`El gasto seleccionado es el: ${element}`);
        }
      });
    });
  }

  ipcRenderer.on(
    "cat-exitosa",
    async (evento, datos, datosPerfil, inicioSesion) => {
      console.log("Catexitosa");
      console.log(datos);
      await todo(datos, datosPerfil, inicioSesion);
      datos = null;
      datosPerfil = null;
      inicioSesion = null;
    }
  );
  ipcRenderer.on(
    "categoria-buena",
    async (evento, datos, datosPerfil, inicioSesion) => {
      console.log("Despues de cambiar nombre puta vida");
      await todo(datos, datosPerfil, inicioSesion);
    }
  );
});
