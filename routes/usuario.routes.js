const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require ('../middlewares');

const {usuarioPost} = require('../controllers/usuarioController');

const { existenteEmail, esRoleValido} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos
    ], usuarioPost);


module.exports = router;