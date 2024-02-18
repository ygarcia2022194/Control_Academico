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

const getCursoById = async (req, res)=>{
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});
    res.status(200).json({
        curso
    });
}

const putCursos = async (req, res= response) =>{
    const {id} = req.params;
    const{_id, estado, ...resto} = req.body;
    
    const curso = await Curso.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'Curso actualizado exitosamente!!!',
        curso
    });
}

const cursoDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estado: false});
    const cursoAutenticado = req.curso;

    res.status(200).json({
        msg: 'Usuario a eliminar',
        curso,
        cursoAutenticado
    })
}
module.exports = {
    cursoPost,
    cursosGet,
    getCursoById,
    putCursos,
    cursoDelete
}