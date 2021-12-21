const inquirer = require("inquirer");

inquirer.registerPrompt("datepicker", require("inquirer-datepicker"));
const bcrypt = require("bcryptjs");

const menuInicio = async() => {
    const opciones = [{
        name: "opcion",
        type: "list",
        message: "Seleccione su opcion",
        choices: [
            { value: 1, name: "Iniciar sesión" },
            { value: 2, name: "¿No tienes cuenta? Registrate!" },
            { value: 3, name: "Salir" },
        ],
    }, ];
    console.log("\n");
    return inquirer.prompt(opciones);
};

const iniciarSesion = async() => {
    const opciones = [{
            name: "email",
            type: "input",
            message: "Por favor digite su correo electrónico: ",
        },
        {
            name: "pass",
            type: "input",
            message: "Por favor digite su contraseña: ",
        },
    ];
    console.log("\n");
    const datosUsuario = inquirer.prompt(opciones);
    return datosUsuario;
};

const pedirRegistro = async() => {
    const opciones = [{
            name: "nombres",
            type: "input",
            message: "Digite sus nombres: ",
        },
        {
            name: "email",
            type: "input",
            message: "Digite su email: ",
        },
        {
            name: "pass",
            type: "input",
            message: "Digite su contraseña: ",
        },
    ];
    return inquirer.prompt(opciones);
};

const menuEnPerfil = async() => {
    const opciones = [{
        name: "opcionMenu",
        type: "list",
        message: "Seleccione lo que desea hacer",
        choices: [
            { value: 1, name: "Crear categoría" },
            { value: 2, name: "Ver categorías" },
            { value: 3, name: "Crear gasto sin categoría" },
            { value: 4, name: "Editar gasto" },
            { value: 5, name: "Eliminar gasto" },
            { value: 6, name: "Reporte de gastos" },
            { value: 7, name: "Salir" },
        ],
    }, ];
    return inquirer.prompt(opciones);
};
const menuCategoriasDeUsuario = async(categoriasdeusuario) => {
    const choices = [];
    for (let index = 0; index < categoriasdeusuario.length; index++) {
        choices.push({
            name: categoriasdeusuario[index].nombreCat,
            value: index,
        });
    }
    const opciones = [{
        name: "VerCategorias",
        type: "list",
        message: "Seleccione la categoria que desea visualizar",
        choices: choices,
    }, ];

    return inquirer.prompt(opciones);
};
const crearCategoria = async() => {
    const opciones = [{
        name: "nombreCat",
        type: "input",
        message: "Escriba el nombre de la categoría (sin repetir una): ",
    }, ];
    return inquirer.prompt(opciones);
};

const accesoCategoria = async() => {
    const opciones = [{
        name: "AccionesCategoria",
        type: "list",
        message: "Acciones categoria",
        choices: [
            { value: 1, name: "Eliminar categoria y eliminar sus gastos" },
            { value: 2, name: "Eliminar categoria sin eliminar sus gastos" },
            { value: 3, name: "Editar categoria nombre categoria" },
            { value: 4, name: "Registrar gasto" },
            { value: 5, name: "Regresar" },
        ],
    }, ];
    return inquirer.prompt(opciones);
};
const nuevoNombreCategoria = async() => {
    const opciones = [{
        name: "nuevoNombreCat",
        type: "input",
        message: "Digite el nuevo nombre de la categoria",
    }, ];
    return inquirer.prompt(opciones);
};

const pedirGasto = async() => {
    const opciones = [{
            name: "fecha",
            type: "datepicker", //tipo fecha por ver
            message: "Digite fecha: ",
            format: ["Y", "/", "MM", "/", "DD"],
        },
        {
            name: "descripcion",
            type: "input",
            message: "Digite descripción del gasto: ",
        },
        {
            name: "valor",
            type: "number",
            message: "Digite valor del gasto: ",
        },
    ];
    return inquirer.prompt(opciones);
};

const menuEliminarOEditarGasto = async(gastos, opcion) => {
    const choices = [];
    for (let index = 0; index < gastos.length; index++) {
        choices.push({
            name: `Fecha: ${gastos[index].fecha}, Descripción: ${gastos[index].descripcion}, Valor: ${gastos[index].valor}, Categoría: ${gastos[index].gastoCat}`,
            value: gastos[index].idGasto,
        });
    }
    const opciones = [{
        name: "seleccionGasto",
        type: "list",
        message: `Seleccione el gasto a ${opcion}`,
        choices: choices,
    }, ];

    return inquirer.prompt(opciones);
};

const asegurarEliminargasto = async() => {
    const opciones = [{
        name: "confirmacion",
        type: "list",
        message: "Seguro que desea eliminar el gasto?",
        choices: [
            { value: true, name: "Si" },
            { value: false, name: "No" },
        ],
    }, ];
    return inquirer.prompt(opciones);
};

const filtradoGastos = async() => {
    const opciones = [{
        name: "filtrado",
        type: "list",
        message: "¿Cómo quiere que se filtren los gastos? ",
        choices: [
            { value: 1, name: "Categoría" },
            { value: 2, name: "Mes" },
            { value: 3, name: "Todo el histórico" },
        ],
    }, ];
    return inquirer.prompt(opciones);
};

const meses = async() => {
    const opciones = [{
        name: "meses",
        type: "list",
        message: "Escoja el mes: ",
        choices: [
            { value: 0, name: "Enero" },
            { value: 1, name: "Febrero" },
            { value: 2, name: "Marzo" },
            { value: 3, name: "Abril" },
            { value: 4, name: "Mayo" },
            { value: 5, name: "Junio" },
            { value: 6, name: "Julio" },
            { value: 7, name: "Agosto" },
            { value: 8, name: "Septiembre" },
            { value: 9, name: "Octubre" },
            { value: 10, name: "Noviembre" },
            { value: 11, name: "Diciembre" },

        ]
    }]
    return inquirer.prompt(opciones);
}

module.exports = {
    pedirRegistro,
    menuInicio,
    iniciarSesion,
    menuEnPerfil,
    crearCategoria,
    menuCategoriasDeUsuario,
    accesoCategoria,
    nuevoNombreCategoria,
    pedirGasto,
    menuEliminarOEditarGasto,
    asegurarEliminargasto,
    filtradoGastos,
    meses
};