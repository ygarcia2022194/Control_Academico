const {Router} = require('express');
const {check} = require('express-validator');
const { cursoPost, cursosGet, getCursoById, putCursos, cursoDelete } = require('../controllers/cursoController');

const {cursoExistente, existeCursoById} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { teacherRole } = require('../middlewares/validar-roles');

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        teacherRole,
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
        validarJWT,
        teacherRole,
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], putCursos)


router.delete(
    "/:id",
    [
        validarJWT,
        teacherRole,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], cursoDelete);
router.get("/", cursosGet);
    

module.exports = router;