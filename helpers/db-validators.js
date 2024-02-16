const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/cursos')

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

const cursoExistente = async (nombreCursos = '')=>{
    const existeCurso = await Curso.findOne({nombreCursos});
    if(existeCurso){
        throw new Error(`El curso ${nombreCursos} ya esta registrado en la base de datos`);
    }
}

const existeCursoById = async (id = '')=>{
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El curos con el ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    cursoExistente,
    existeCursoById
}