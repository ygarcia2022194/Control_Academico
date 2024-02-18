const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {alumnosPost}= require('../controllers/alumnoController');
const {existeEmailA} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del alumno no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este correo no es valido").isEmail(),
        check("correo").custom(existeEmailA),
        validarCampos
    ], alumnosPost);


module.exports = router;