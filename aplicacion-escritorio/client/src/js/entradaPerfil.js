const { ipcRenderer } = require("electron");
const { traerUsuario, cargarUsuarios, reemplazar } = require("../data");
const { eliminarGasto, gastos } = require("../gastosMenu");

document.addEventListener("DOMContentLoaded", async () => {
  let Tbodytablaprincipal = document.getElementById("Tbodytablaprincipal");

  let contadorsua = 0;
  ipcRenderer.on("login-exitoso", async (evento, datos, inicioSesion) => {
    let userName = document.getElementById("user-name");
    contadorsua += 1;
    console.log("cont", contadorsua);
    console.log("DATOS", datos);
    console.log("INICIO", inicioSesion);
    let usuarios = await cargarUsuarios();
    console.log(usuarios, "#33333333");
    usuario = await traerUsuario(usuarios, datos);
    console.log(usuario);
    datos = usuario;
    console.log(datos);

    userName.innerHTML = datos.nombres;
    // Obtener todos los gastos con categoria
    while (Tbodytablaprincipal.firstChild) {
      Tbodytablaprincipal.removeChild(Tbodytablaprincipal.firstChild);
    }

    let arrayGastos = await gastos(datos);
    // datos.categoria.forEach((element) => {
    //   element.gastos.forEach((element1, index) => {
    //     console.log(element1);
    //     let tr = document.createElement("tr");
    //     let td1 = document.createElement("td");
    //     td1.innerHTML = `<input type="radio" name="check" id="${element1.idGasto}">`;
    //     tr.appendChild(td1);

    //     let td2 = document.createElement("td");
    //     td2.textContent = element1.descripcion;
    //     tr.appendChild(td2);
    //     let td3 = document.createElement("td");
    //     td3.textContent = element1.gastoCat;
    //     tr.appendChild(td3);
    //     let td4 = document.createElement("td");
    //     td4.textContent = element1.valor;
    //     tr.appendChild(td4);
    //     let td5 = document.createElement("td");
    //     td5.textContent = element1.fecha;
    //     tr.appendChild(td5);

    //     Tbodytablaprincipal.appendChild(tr);
    //   });
    // });
    // datos.gastoSinCat.forEach((element, index) => {
    //   let tr = document.createElement("tr");
    //   let td1 = document.createElement("td");
    //   td1.innerHTML = `<input type="radio" name="check" id="${element.idGasto}">`;
    //   tr.appendChild(td1);

    //   let td2 = document.createElement("td");
    //   td2.textContent = element.descripcion;
    //   tr.appendChild(td2);
    //   let td3 = document.createElement("td");
    //   td3.textContent = element.gastoCat;
    //   tr.appendChild(td3);
    //   let td4 = document.createElement("td");
    //   td4.textContent = element.valor;
    //   tr.appendChild(td4);
    //   let td5 = document.createElement("td");
    //   td5.textContent = element.fecha;
    //   tr.appendChild(td5);

    //   Tbodytablaprincipal.appendChild(tr);
    // });
    arrayGastos.forEach((element, index) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML = `<input type="radio" name="check" id="${element.idGasto}">`;
      tr.id = `${element.idGasto}`;
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.textContent = element.descripcion;
      tr.appendChild(td2);
      let td3 = document.createElement("td");
      td3.textContent = element.gastoCat;
      tr.appendChild(td3);
      let td4 = document.createElement("td");
      td4.textContent = element.valor;
      tr.appendChild(td4);
      let td5 = document.createElement("td");
      td5.textContent = element.fecha;
      tr.appendChild(td5);

      Tbodytablaprincipal.appendChild(tr);
    });
    //obtener todos los gastos SIN categoria
    for (let elemento in datos.gastoSinCat) {
      console.log(elemento);
    }

    let boton = document.getElementById("crearGasto");
    boton.addEventListener("click", () => {
      ipcRenderer.send("sin-cat", datos, inicioSesion);
    });

    let btnEliminarGasto = document.getElementById("btnEliminarGasto");
    btnEliminarGasto.addEventListener("click", async () => {
      let check = document.querySelectorAll("input[name='check']");
      check.forEach(async (element, index) => {
        if (element.checked == true) {
          console.log(element);
          console.log(`El gasto seleccionado es el: ${element}`);
          let usuario = await eliminarGasto(
            element.id,
            datos,
            arrayGastos,
            true,
            "a"
          );
          console.log(usuario);
          await reemplazar(usuario);
          Tbodytablaprincipal.removeChild(
            document.getElementById(`${element.id}`)
          );
        }
      });
    });
  });
});
