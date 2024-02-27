const Role = require('../models/role');
const Curso = require('../models/cursos');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const buscarCursoPorNombre = async(nombre)=>{
    try {
        const curso = await Curso.findOne({nombreCursos: nombre});
        return curso;
    } catch (error) {
        console.error('Error al buscar el curso por el nombre:',error);
        throw new Error('Error al buscar el curso por nombre');

    }
}

const existeAsignacion = async (alumnoId, cursoId)=>{
    const asignacion = await Alumno.findOne({_id: alumnoId, curso: cursoId});
    return asignacion !== null;
}
const existeAsignacionMaestro = async (maestroId, cursoId)=>{
    const asignacion = await Maestro.findOne({id});
    return asignacion !== null;
}
const existeEmailA = async(correo = '')=>{
    const existeEmailA = await Alumno.findOne({correo});
    if(existeEmailA){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const esRoleValido = async(role = '')=> {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
       throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Maestro.findOne({correo});
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
    existeCursoById,
    existeEmailA,
    existeAsignacion,
    existeAsignacionMaestro,
    buscarCursoPorNombre
}