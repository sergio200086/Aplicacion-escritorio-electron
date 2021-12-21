const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { Console } = require("console");

const rutaArchivo = path.join(__dirname, `datos.json`);

const {
  crearUsuario,
  todosUsuarios,
  obtenerUsuario,
  reemplazarUsuario,
} = require("../../server/test-client/test-usuario");

const cargarUsuarios = async () => {
  let datos = await todosUsuarios();
  console.log(`Cargando los Usuarios...`);
  // if (fs.existsSync(rutaArchivo)) {
  //   let arhivo = fs.readFileSync(rutaArchivo);
  //   let datos = JSON.parse(arhivo);
  //   return datos;
  // }
  return datos;
};

const validacionDatos = async (registro) => {
  //console.log(`${registro.email}`)
  if (
    registro.email == "" ||
    registro.pass == "" ||
    registro.email == " " ||
    registro.pass == " "
  ) {
    console.log(
      `Por favor revise que el correo o la contraseña no estén vacios`
    );
    return false;
  } else {
    return true;
  }
};

const reemplazar = async (datos) => {
  //console.log(datos);
  let datosT = await cargarUsuarios();

  let indice = datosT.findIndex((b) => b._id === datos._id);
  if (indice === -1) {
  } else {
    await reemplazarUsuario(datos._id, datos);
    console.log("Datost desde main reemplazar", datosT);
  }
};

const validacionDatosCat = async (categoria, datos, datosT) => {
  const nombre = categoria.nombreCat;
  if (nombre == "" || nombre == " ") {
    console.log(`Ponga un nombre válido plis`);
    return false;
  } else {
    let indice = datos.categoria.findIndex((b) => b.nombreCat === nombre);
    if (indice == -1) {
      datos.categoria.push(categoria);
      console.log(datos);
      await reemplazar(datos);
      //console.log(datos);
      console.log(`Nombre válido`);
      return true;
    } else {
      console.log(`El nombre "${nombre}" ya está repetido`);
      return false;
    }
  }
};

async function agregarUsuario(datos, nuevoUsuario) {
  console.log(datos, "los datos");
  let indice = datos.findIndex((b) => b.email === nuevoUsuario.email);
  if (indice === -1) {
    // return datos;
    return true;
  } else {
    console.log(`El correo electrónico suministrado ya existe!!`);
    return false;
  }
}

async function comaparaInicioSesion(datos, datosInicioSesion) {
  console.log(datosInicioSesion, "---------");
  let usuarioComparado = datos.filter(function (b) {
    return b.email == datosInicioSesion.email;
  });
  //Compara la contraseña suministrada vs la base de datos
  if (usuarioComparado == "") {
    console.log("nada");
    return false;
  } else {
    console.log(usuarioComparado[0].pass, "222222222");
    validacion = await bcrypt.compare(
      datosInicioSesion.pass.toString(),
      usuarioComparado[0].pass
    );
    console.log(validacion);
    return validacion;
  }
}

async function traerUsuario(datos, datosInicioSesion) {
  console.log(datos);
  let usuarioComparado = datos.filter(function (b) {
    return b.email == datosInicioSesion.email;
  });
  console.log(usuarioComparado[0]._id);
  usuarioComparado = await obtenerUsuario(usuarioComparado[0]._id);
  return usuarioComparado;
}

async function comprobarNombreCategoria(nombreCat, datos) {
  if (nombreCat.nuevoNombreCat == "" || nombreCat.nuevoNombreCat == " ") {
    console.log(`Ponga un nombre válido`);
    return false;
  } else {
    let indice = datos.categoria.findIndex(
      (b) => b.nombreCat === nombreCat.nuevoNombreCat
    );
    return indice === -1;
  }
}

async function eliminarCategoria(datosU, confirmacion, posCat) {
  if (confirmacion) {
    await datosU.categoria.splice(posCat, 1);
    await reemplazar(datosU);
    return datosU;
  } else {
    console.log(datosU.categoria[posCat].gastos);
    datosU.categoria[posCat].gastos.forEach((element) => {
      console.log(element);
      element.gastoCat = undefined;
    });
    let cambio = datosU.categoria[posCat].gastos;
    await datosU.categoria.splice(posCat, 1);
    datosU.gastoSinCat = datosU.gastoSinCat.concat(cambio);
    await reemplazar(datosU);
    return datosU;
  }
}
module.exports = {
  cargarUsuarios,
  agregarUsuario,
  comaparaInicioSesion,
  validacionDatos,
  validacionDatosCat,
  traerUsuario,
  reemplazar,
  comprobarNombreCategoria,
  eliminarCategoria,
};
