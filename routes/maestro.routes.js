const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {maestrosPost, 
        maestrosGet} = require('../controllers/maestroController');

const { existenteEmail, existeMaestroById, } = require('../helpers/db-validators');

const router = Router();
router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("telefono", "el telefono debe ser mayor o igual de 8 digitos").isLength({min:8}),
        validarCampos,
    ], maestrosPost);

router.get("/", maestrosGet)
module.exports = router;