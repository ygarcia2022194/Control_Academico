const {request, response} = require('express');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async (req = request, res = respose) => {
    const { correo, password } = req.body;

    try {

        let user = await Maestro.findOne({ correo });

        if (!user) {
            user = await Alumno.findOne({ correo });
            if (!user) {
              console.log('Usuario no encontrado');
              return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
              });
            }
          }
      
          console.log('Usuario encontrado:', user);

        if(!user.estado){
            return res.status(400).json({
                msg: "El Usuario no existe en la Base de datos"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
         if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
         }


         const token = await generarJWT(user.id);

         res.status(200).json({
            msg: "Bienvenido",
            user,
            token
         });

        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}

module.exports ={
    login
}