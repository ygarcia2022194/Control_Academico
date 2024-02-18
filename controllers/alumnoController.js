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

module.exports={
    alumnosPost
};