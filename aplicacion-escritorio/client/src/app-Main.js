const inquirer = require("inquirer");

const { pedirRegistro, menuInicio, iniciarSesion } = require("./input");
const {
  cargarUsuarios,
  agregarUsuario,
  comaparaInicioSesion,
  validacionDatos,
  traerUsuario,
} = require("./data");
const { menuPerfil } = require("./manejoMenus");
async function main() {
  let a = true;
  while (a) {
    //Inicamos el menú de inicio de la interfaz
    let menuOpcion = await menuInicio();
    let opcion = menuOpcion.opcion;

    //evaluamos que es lo que quiere hacer el usuario como primera medida
    switch (opcion) {
      case 1:
        let datos = await cargarUsuarios();
        const datosInicioSesion = await iniciarSesion();
        const validacion = await comaparaInicioSesion(datos, datosInicioSesion);
        //console.log(validacion);
        if (validacion) {
          const usuario = await traerUsuario(datos, datosInicioSesion);
          console.log(`Este es su perfil`);
          // para crear categoria:
          let b = true;
          while (b) {
            b = await menuPerfil(usuario, datos);
          }
        } else {
          console.log(`Los datos suministrados no son válidos`);
        }

        break;

      case 2:
        //cargar los Usuarios
        let datos1 = await cargarUsuarios();
        let datosRegistro = await pedirRegistro();

        const comprobante = await validacionDatos(datosRegistro);
        if (comprobante) {
          await agregarUsuario(datos1, datosRegistro);
        }
        break;

      case 3:
        a = false;
        break;
    }
  }

  //PREGUNTAR POR QUE PUTAS NO CARGA LOS USUARIOS QUE SON SINO QUE CARGA 1 MENOS DESPUES DE QUE SE AGREGA UNO, VIAD HP
  let b = await cargarUsuarios();
  console.log(b);
}
main();

// async function login(datosLogin) {
//   let datos = await cargarUsuarios();
//   const validacion = await comaparaInicioSesion(datos, datosLogin);
//   console.log(validacion);
// }
// module.exports = {
//   login,
// };
