const bcryptjs = require('bcryptjs');

const Alumno = require('../models/alumno');
const { response, request } = require('express');
const Curso = require('../models/cursos');

const alumnosPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const alumno = new Alumno({ nombre, correo, password });

    if (password) {
        const salt = bcryptjs.genSaltSync();
        alumno.password = bcryptjs.hashSync(password, salt);
    }
    await alumno.save();
    res.status(202).json({
        alumno
    });
}

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

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

const putAlumnos = async (req, res = response) => {
    const { id } = req.params;
    const { cursos, ...resto } = req.body;
    
    try {
        const cursosNombres = cursos.map(curso => curso.nombreCursos);
        const cursosExistentes = await Curso.find({ nombre: { $in: cursosNombres } });
    
        if (cursosExistentes.length !== cursosNombres.length) {
            return res.status(400).json({ error: 'Alguno de los cursos ingresados no está en la base de datos' });
        }

        const cursosIds = cursosExistentes.map(curso => curso._id);
    
        const alumno = await Alumno.findByIdAndUpdate(id, { ...resto, cursos: cursosIds });
    
        res.status(200).json({
            msg: 'Alumno actualizado',
            alumno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
}

module.exports = {
    alumnosPost,
    alumnosGet,
    putAlumnos
};