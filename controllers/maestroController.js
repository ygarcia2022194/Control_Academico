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

const putMaestros = async (req, res= response)=>{
    const {id} = req.params;
    const {curso, ...resto} = req.body;
    try {
        const cursoExistenteMaes = await Curso.find({_id: {$in: curso}});
        if(cursoExistenteMaes.lenght !== curso.lenght){
            return res.status(400).json({error: 'uno o mas cursos no existen'});
        }
        const maestro = await Maestro.findByIdAndUpdate(id, {...resto,curso});

        res.status(200).json({
            msg: 'Mestro actualizado',
            maestro
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({error: "Error al actualizar el maestro"});            
    }
}

module.exports ={
    maestrosPost,
    maestrosGet,
    putMaestros
}