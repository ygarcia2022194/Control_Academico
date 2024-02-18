const {Schema, model} = require('mongoose');
const MaestroSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio']
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    telefono:{
        type: String,
        require: [true, 'El telefono es obligatorio']
    },
    curso:{
        type: [Schema.Types.ObjectId],
        ref: 'Curso'
    },
    role: {
        type: String,
        default: 'TEACHER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});


module.exports = model('Maestro', MaestroSchema);