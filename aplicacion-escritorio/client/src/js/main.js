const { app, BrowserWindow, Menu, ipcMain, webContents } = require("electron");
const url = require("url");
const path = require("path");

const { traerUsuario, cargarUsuarios } = require("../data");
const {
  crearUsuario,
  todosUsuarios,
  obtenerUsuario,
} = require("../../../server/test-client/test-usuario");

let win;
let ventana;
let ventanaCambiarCat;

async function redireccion(pagina) {
  ventana.loadURL(
    url.format({
      pathname: path.join(__dirname, `../templates/${pagina}.html`),
      protocol: "file",
      slashes: true,
    })
  );
}

function nuevaVentana() {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    title: "Registro",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../templates/registro.html"),
      protocol: "file",
      slashes: true,
    })
  );
}

async function cambiarNombreCat() {
  ventanaCambiarCat = new BrowserWindow({
    width: 500,
    height: 500,
    title: "Registro",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ventanaCambiarCat.loadURL(
    url.format({
      pathname: path.join(__dirname, "../templates/cambiarNombreCat.html"),
      protocol: "file",
      slashes: true,
    })
  );

  ventanaCambiarCat.on("closed", () => {
    ventanaCambiarCat = null;
  });
}
let usuario;
async function refrescante(datosLogin) {
  let datos = await todosUsuarios();
  console.log(datos, "datos usuario");
  usuario = await traerUsuario(datos, datosLogin);
  console.log(usuario, "EL PUTO USUARIO");
  return usuario;
}

app.on("ready", () => {
  ventana = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Mi primera app",
    center: true,
    maximizable: true,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  ventana.loadURL(
    url.format({
      pathname: path.join(__dirname, "../templates/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  ventana.once("ready-to-show", () => {
    ventana.show();
  });

  ventana.on("closed", () => {
    ventana = null;
    app.quit();
  });

  ipcMain.on("login", async (evento, datos, inicioSesion) => {
    console.log(datos[0], "WWWWWWWWWWW");
    await redireccion("entradaPerfil");
    let usuario1 = await refrescante(inicioSesion);
    console.log(usuario1);
    ventana.on("ready-to-show", () => {
      /* Despues que ocurre el evento se manda el mensaje*/
      ventana.webContents.send("login-exitoso", usuario1, inicioSesion);
    });

    // ventana.close();
  });

  ipcMain.on("sin-cat", async (evento, datos, inicioSesion) => {
    await redireccion("crearGastoSinCat");
    let usuario = await refrescante(inicioSesion);
    console.log(datos, "}}}}}}}}}}}}}}}}}}}}");
    console.log(usuario, "eeeeeeeeeeeeeeeee");
    ventana.on("ready-to-show", () => {
      /* Despues que ocurre el evento se manda el mensaje*/
      ventana.webContents.send("sin-cat", datos, usuario, inicioSesion);
    });
  });

  ipcMain.on("register", (evento) => {
    nuevaVentana();
  });

  ipcMain.on(
    "cerrar-ver-categoria",
    async (evento, categoria, datosPerfil, inicioSesion) => {
      await ventanaCambiarCat.close();
      await redireccion("gastosXCategoria");
      console.log(categoria, "-----------------");

      let usuarioN = await refrescante(datosPerfil);
      console.log(usuarioN, "======================================");

      /* Despues que ocurre el evento se manda el mensaje*/
      await ventana.webContents.send(
        "categoria-buena",
        categoria[0],
        usuarioN,
        inicioSesion
      );
    }
  );

  ipcMain.on(
    "ver-categoria",
    async (evento, categoria, datosPerfil, inicioSesion) => {
      await redireccion("gastosXCategoria");
      console.log(categoria[0], "========Desde Main=====");
      ventana.on("ready-to-show", async () => {
        /* Despues que ocurre el evento se manda el mensaje*/
        await ventana.webContents.send(
          "cat-exitosa",
          categoria[0],
          datosPerfil,
          inicioSesion
        );
      });
      // console.log(datos[0]);
    }
  );

  ipcMain.on(
    "cambiar-nombre-categoria",
    async (evento, datos, datosPerfil, inicioSesion) => {
      await cambiarNombreCat();
      ventanaCambiarCat.on("ready-to-show", async () => {
        /* Despues que ocurre el evento se manda el mensaje*/
        await ventanaCambiarCat.webContents.send(
          "cambiar-nombre-categoria",
          datos,
          datosPerfil,
          inicioSesion
        );
      });
    }
  );

  ipcMain.on("redireccion", async (e, datos, inicioSesion) => {
    await redireccion("verCategorias");
    let usuario1 = await refrescante(inicioSesion);
    console.log(inicioSesion);
    console.log(usuario1, "=================================");

    /* Despues que ocurre el evento se manda el mensaje*/
    ventana.webContents.send("refresco", datos, inicioSesion);
  });

  ipcMain.on(
    "crear-gasto-con-cat",
    async (e, datos, datosPerfil, inicioSesion) => {
      // La variable "datos" es la categoría actual

      await redireccion("crearGastoConCat");
      let usuario = await refrescante(inicioSesion);
      console.log(usuario[0]);
      ventana.on("ready-to-show", () => {
        /* Despues que ocurre el evento se manda el mensaje*/
        ventana.webContents.send(
          "crear-gasto-cat",
          datos,
          usuario,
          inicioSesion
        );
      });
    }
  );
  ipcMain.on(
    "devolver-gastos-cat",
    async (evento, cat, datosPerfil, inicioSesion) => {
      redireccion("entradaPerfil");
      let usuario = refrescante(inicioSesion);
      ventana.on("ready-to-show", () => {
        ventana.webContents.send("cat-exitosa1", cat, usuario[0], inicioSesion);
      });
    }
  );
});

const templateMenu = [
  {
    label: "Tareas",
    submenu: [
      {
        label: "Salir",
        accelerator: process.platform === "darwin" ? "command+Q" : "Ctrl*Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (!app.isPackaged) {
  templateMenu.push({
    label: "DevTools",
    submenu: [
      {
        label: "Mostrar / Ocultar DevTools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "Reload",
      },
    ],
  });
}
module.exports = {
  refrescante,
};
