const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre :{
        type: String, 
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    curso: {
        type: [Schema.Types.ObjectId],
        ref: 'Curso'
    },
    role:{
        type: String,
        default: 'STUDENT_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{__v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
}

module.exports = model('Alumno', AlumnoSchema);