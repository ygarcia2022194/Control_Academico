const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role = '')=> {
    const existeRol = await Role.findOne({role});
   if(!existeRol){
       throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail
}