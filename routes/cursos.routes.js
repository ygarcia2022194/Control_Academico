const {Router} = require('express');
const {check} = require('express-validator');
const { cursoPost, cursosGet, getCursoById, putCursos, cursoDelete } = require('../controllers/cursoController');

const {cursoExistente, existeCursoById} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post(
    "/",
    [
        check("nombreCursos").custom(cursoExistente),
        check("profesorCurso", "El nombre del alumno es obligatorio").not().isEmpty(),
        check("descripcionCurso", "La descripcion del curso es obligatoria").not().isEmpty(),
        validarCampos
    ], cursoPost);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById);


router.put(
    "/:id",
    [
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], putCursos)


router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], cursoDelete);
router.get("/", cursosGet);
    

module.exports = router;