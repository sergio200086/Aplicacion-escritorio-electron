const { v4: uuidv4 } = require("uuid");
const {
  crearCategoria,
  menuEnPerfil,
  menuCategoriasDeUsuario,
  accesoCategoria,
  nuevoNombreCategoria,
  pedirGasto,
  menuEliminarOEditarGasto,
  asegurarEliminargasto,
  filtradoGastos,
  meses,
} = require("./input");

const {
  validacionDatosCat,
  reemplazar,
  comprobarNombreCategoria,
  eliminarCategoria,
} = require("./data");

const { gastos, gastoCat, eliminarGasto } = require("./gastosMenu");
const dayjs = require("dayjs");

const menuPerfil = async (datosInicioSesion, datosT) => {
  const opcion = await menuEnPerfil();
  //console.log(datosInicioSesion);
  switch (opcion.opcionMenu) {
    case 1:
      let nombreCat = await crearCategoria();
      nombreCat["gastos"] = [];
      await validacionDatosCat(nombreCat, datosInicioSesion[0], datosT);
      return true;

    case 2:
      //Para ver las categorías
      let visualizarcategorias = await menuCategoriasDeUsuario(
        datosInicioSesion[0].categoria
      );

      let c = true;
      while (c) {
        let eleccion = await accesoCategoria();
        //Este switch es para el menú dentro de una categoría
        switch (eleccion.AccionesCategoria) {
          case 1:
            console.log("Eliminaaaaaaando gastos");
            await eliminarCategoria(
              datosInicioSesion[0],
              true,
              visualizarcategorias.VerCategorias
            );

            break;
          case 2: //eliminar categoría
            await eliminarCategoria(
              datosInicioSesion[0],
              false,
              visualizarcategorias.VerCategorias
            );
            console.log("Sin gastoooooooos");
            break;
          case 3:
            //Editar nombre de categoria
            let entradaNuevoNombre = await nuevoNombreCategoria();
            let comprobante = await comprobarNombreCategoria(
              entradaNuevoNombre,
              datosInicioSesion[0]
            );

            if (comprobante) {
              datosInicioSesion[0].categoria[
                visualizarcategorias.VerCategorias
              ].nombreCat = entradaNuevoNombre.nuevoNombreCat;
              await reemplazar(datosInicioSesion[0]);
              console.log(`Se ha cambiado el nombre de la categoría`);
            } else {
              console.log(
                `El nombre ${entradaNuevoNombre.nuevoNombreCat} ya está repetido`
              );
            }

            break;
          case 4: //Registrar gasto
            let gasto = await pedirGasto();
            let userId = uuidv4();
            if (
              gasto.descripcion == "" ||
              gasto.descripcion == " " ||
              gasto.valor == NaN ||
              gasto.valor <= 0
            ) {
              console.log("Digite algo válido plis ");
            } else {
              gasto["idGasto"] = userId;
              gasto["gastoCat"] =
                datosInicioSesion[0].categoria[
                  visualizarcategorias.VerCategorias
                ].nombreCat;
              console.log(gasto);
              datosInicioSesion[0].categoria[
                visualizarcategorias.VerCategorias
              ].gastos.push(gasto);
              console.log(datosInicioSesion[0]);
              await reemplazar(datosInicioSesion[0]);
            }

            break;
          case 5:
            c = false;
            console.log("Volveeeeeeeeeeeer");
            break;
        }
      }

      return true;

    case 3:
      console.log("Crear gasto sin cat");

      const gasto = await pedirGasto();
      if (
        gasto.descripcion == "" ||
        gasto.descripcion == " " ||
        gasto.valor == NaN ||
        gasto.valor <= 0
      ) {
        console.log("Digite algo válido plis ");
      } else {
        let userId = uuidv4();
        gasto["idGasto"] = userId;
        datosInicioSesion[0].gastoSinCat.push(gasto);
        await reemplazar(datosInicioSesion[0]);
      }
      return true;

    case 4: // Editar gasto
      let gastoEditar = await gastos(datosInicioSesion[0]);
      let opcionesEditar = await menuEliminarOEditarGasto(
        gastoEditar,
        "editar"
      );
      console.log(opcionesEditar.seleccionGasto, "xxxxxxxxxxxxxxxx");
      const gasto1 = await pedirGasto();
      let userId1 = uuidv4();
      gasto1["idGasto"] = userId1;
      let usuarioN = await eliminarGasto(
        opcionesEditar.seleccionGasto,
        datosInicioSesion[0],
        gastoEditar,
        false,
        gasto1
      );
      await reemplazar(usuarioN);
      return true;

    case 5: // Eliminar Gasto
      let gastoEliminar = await gastos(datosInicioSesion[0]);
      let opcionesEliminar = await menuEliminarOEditarGasto(
        gastoEliminar,
        "eliminar"
      );
      let conf = await asegurarEliminargasto();
      if (conf.confirmacion) {
        console.log(datosInicioSesion[0]);
        let nUsuario = await eliminarGasto(
          opcionesEliminar.seleccionGasto,
          datosInicioSesion[0],
          gastoEliminar,
          true,
          1
        );
        await reemplazar(nUsuario);
        console.log("--------- Gasto eliminado ---------");
      } else {
        console.log("Pues que gey");
      }
      return true;

    case 6: //Reporte de gastos
      let filtro = await filtradoGastos();
      switch (filtro.filtrado) {
        case 1:
          let visualizarcategorias1 = await menuCategoriasDeUsuario(
            datosInicioSesion[0].categoria
          );
          let a = await gastoCat(
            datosInicioSesion[0],
            visualizarcategorias1.VerCategorias
          );
          for (const gasto2 of a) {
            console.log(
              `Fecha: ${gasto2.fecha}, Descripción: ${gasto2.descripcion}, Valor: ${gasto2.valor}, Categoría: ${gasto2.gastoCat}`
            );
            console.log("\n");
          }
          break;
        case 2:
          let arregloGastos = await gastos(datosInicioSesion[0]);
          let opcion = await meses();

          let nArregloGastos = arregloGastos.filter(
            (gasto) => dayjs(gasto.fecha.toString()).month() == opcion.meses
          );
          for (const gasto of nArregloGastos) {
            if (gasto.gastoCat == undefined) {
              gasto.gastoCat = "Sin categoría";
            }
            console.log(
              `Fecha: ${gasto.fecha}, Descripción: ${gasto.descripcion}, Valor: ${gasto.valor}, Categoría: ${gasto.gastoCat}`
            );
            console.log(
              "------------------------------------------------------------------------------------------"
            );
          }
          break;
        case 3:
          let arrayGastoCat = await gastos(datosInicioSesion[0]);
          for (const gasto of arrayGastoCat) {
            if (gasto.gastoCat == undefined) {
              gasto.gastoCat = "Sin categoría";
            }
            console.log(
              `Fecha: ${gasto.fecha}, Descripción: ${gasto.descripcion}, Valor: ${gasto.valor}, Categoría: ${gasto.gastoCat}`
            );
            console.log(
              "------------------------------------------------------------------------------------------"
            );
          }
          break;
      }

      return true;

    case 7: //Salir
      return false;
  }
};

module.exports = {
  menuPerfil,
};
