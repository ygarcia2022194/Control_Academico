const Curso = require('../models/cursos');
const {response} = require('express');

const cursoPost = async(req, res) =>{
    const {nombreCursos, profesorCurso, descripcionCurso} = req.body;
    const curso = new Curso({nombreCursos, profesorCurso, descripcionCurso});
    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursoPost
}