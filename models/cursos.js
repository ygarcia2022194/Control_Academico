const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombreCursos:{
        type: String,
        required: [true, 'El nombre de los curso es obligatorio']
    },
    profesorCurso:{
        type: String,
        required: [true, 'El profesor del curso es obligatorio']
    },
    descripcionCurso:{
        type: String,
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);