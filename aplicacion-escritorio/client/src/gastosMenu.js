const dayjs = require("dayjs");

const gastos = async (usuario) => {
  let arrayGastoCat = [];
  for (const valor of usuario.categoria) {
    arrayGastoCat = arrayGastoCat.concat(valor.gastos);
  }
  arrayGastoCat = arrayGastoCat.concat(usuario.gastoSinCat);
  for (let index = 0; index < arrayGastoCat.length; index++) {
    arrayGastoCat[index].fecha = dayjs(arrayGastoCat[index].fecha).format(
      "YYYY/MM/DD"
    );
  }
  console.log(arrayGastoCat);

  arrayGastoCat.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return -1;
    }
    if (a.fecha < b.fecha) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  return arrayGastoCat;
  //   let gastosU = usuario.categoria.
};

const eliminarGasto = async (id, usuario, listaGastos, c, gasto1) => {
  if (c) {
    for (const gasto of listaGastos) {
      if (id == gasto.idGasto) {
        if (gasto.gastoCat == undefined) {
          let indice = usuario.gastoSinCat.findIndex((b) => b.idGasto == id);
          usuario.gastoSinCat.splice(indice, 1);
        } else {
          for (const categoriaU of usuario.categoria) {
            let indice = categoriaU.gastos.findIndex((b) => b.idGasto == id);
            if (indice == -1) {
              continue;
            } else {
              categoriaU.gastos.splice(indice, 1);
            }
          }
        }
      }
    }
    return usuario;
  } else {
    for (const gasto of listaGastos) {
      if (id == gasto.idGasto) {
        if (gasto.gastoCat == undefined) {
          let indice = usuario.gastoSinCat.findIndex((b) => b.idGasto == id);
          usuario.gastoSinCat.splice(indice, 1, gasto1);
        } else {
          for (const categoriaU of usuario.categoria) {
            let indice = categoriaU.gastos.findIndex((b) => b.idGasto == id);
            if (indice == -1) {
              continue;
            } else {
              categoriaU.gastos.splice(indice, 1, gasto1);
            }
          }
        }
      }
    }
    return usuario;
  }
};

const gastoCat = async (usuario, categoria) => {
  for (
    let index = 0;
    index < usuario.categoria[categoria].gastos.length;
    index++
  ) {
    usuario.categoria[categoria].gastos[index].fecha = dayjs(
      usuario.categoria[categoria].gastos[index].fecha
    ).format("YYYY/MM/DD");
  }
  usuario.categoria[categoria].gastos.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return -1;
    }
    if (a.fecha < b.fecha) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  console.log(usuario.categoria[categoria].gastos);

  // console.log(
  //   usuario.categoria[categoria].gastos.sort(function compare(a, b) {
  //     if (a.fecha < b.fecha) {
  //       return -1;
  //     }
  //     if (a.fecha > b.fecha) {
  //       return 1;
  //     }
  //     // a debe ser igual b

  //     return 0;
  //   })
  // );
  return usuario.categoria[categoria].gastos;
};

module.exports = {
  gastos,
  gastoCat,
  eliminarGasto,
};
