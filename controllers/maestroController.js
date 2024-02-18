const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');

const {response, request} = require('express');
const Curso = require('../models/cursos');

const maestrosPost = async (req, res) => {
    const {nombre, correo, password, telefono} = req.body;
    const maestro = new Maestro({nombre, correo, password, telefono});

    if(password){
        const salt = bcryptjs.genSaltSync();
        maestro.password = bcryptjs.hashSync(password, salt);

    }

    await maestro.save();
    res.status(202).json({
        maestro
    });
}

module.exports ={
    maestrosPost
}