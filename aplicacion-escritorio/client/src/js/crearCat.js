const { ipcRenderer } = require("electron");

const { validacionDatosCat } = require("../data");

let boton = document.getElementById("btnCrearCat");
let nombreCat1 = document.getElementById("nombreCat");

ipcRenderer.on("login-exitoso", (evento, datos, inicioSesion) => {
  let userName = document.getElementById("user-name");
  userName.innerHTML = datos.nombres;

  boton.addEventListener("click", async () => {
    let inputCat1 = document.getElementById("inputCat1");
    let categoria = {
      nombreCat: inputCat1.value,
      gastos: [],
    };
    console.log(datos);
    let confirmacion = await validacionDatosCat(categoria, datos, 1);
    if (confirmacion) {
      nombreCat1.innerHTML = "Categoría creada exitosamente";
      nombreCat1.classList.toggle("alert");
      nombreCat1.classList.toggle("alert-success");
      //ipcRenderer.send("redireccion", datos, inicioSesion);
    } else {
      nombreCat1.innerHTML =
        "Categoría no se creó, por favor revise que no esté repetida o que escribió algo";
      nombreCat1.classList.toggle("alert");
      nombreCat1.classList.toggle("alert-danger");
    }
  });
});
