const bcryptjs = require('bcryptjs');

const Alumno = require('../models/alumno');
const {response, request} = require('express');
const Curso = require('../models/cursos');

const alumnosPost = async (req, res)=> {
    const {nombre, correo, password} = req.body;
    const alumno = new Alumno({nombre, correo, password});

    if(password){
        const salt = bcryptjs.genSaltSync();
        alumno.password = bcryptjs.hashSync(password, salt);
    }
    await alumno.save();
    res.status(202).json({
        alumno
    });
}

const alumnosGet = async (req, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        alumnos
    });
}

module.exports={
    alumnosPost,
    alumnosGet
};