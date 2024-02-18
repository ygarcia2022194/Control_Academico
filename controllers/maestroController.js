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

const maestrosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};
    
    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestros
    });
}

module.exports ={
    maestrosPost,
    maestrosGet
}