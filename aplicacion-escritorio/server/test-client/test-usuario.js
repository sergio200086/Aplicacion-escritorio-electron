const axios = require("axios");
const bcrypt = require("bcryptjs");

const todosUsuarios = async () => {
  const usuarios = await axios.get(`http://localhost:3000/usuarios`);

  return usuarios.data;
};

const crearUsuario = async (nombres, email, pass) => {
  await bcrypt.hash(pass, 10, async (error, encriptada) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log(encriptada);
      pass = encriptada;
      console.log(typeof pass);
    }
    const respuesta = await axios.post(`http://localhost:3000/usuarios`, {
      nombres: nombres,
      email: email,
      pass: pass,
    });
    console.log(respuesta.data);
  });
  console.log(pass);
};

const obtenerUsuario = async (id) => {
  const usuario = await axios.get(`http://localhost:3000/usuarios/${id}`);
  return usuario.data;
};

const reemplazarUsuario = async (id, objeto) => {
  console.log(objeto, "objeto");
  const respuesta = await axios.patch(
    `http://localhost:3000/usuarios/${id}`,
    objeto
  );
};

module.exports = {
  todosUsuarios,
  crearUsuario,
  obtenerUsuario,
  reemplazarUsuario,
};
