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

const cursosGet = async (req, res = response) =>{
    const{limite, desde} = req.query;
    const query = {estado: true};
    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        cursos
    })
}

module.exports = {
    cursoPost,
    cursosGet
}