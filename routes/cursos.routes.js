const {Router} = require('express');
const {check} = require('express-validator');
const { cursoPost } = require('../controllers/cursoController');

const {cursoExistente} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post(
    "/",
    [
        check("nombreCursos").custom(cursoExistente),
        check("nombreAlumno", "El nombre del alumno es obligatorio").not().isEmpty(),
        check("descripcionCurso", "La descripcion del curso es obligatoria").not().isEmpty(),
        validarCampos
    ], cursoPost)


    module.exports = router;