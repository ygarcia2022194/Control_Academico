const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {alumnosPost, 
        alumnosGet,
        putAlumnos}= require('../controllers/alumnoController');
const {existeEmailA, existeAsignacion} = require('../helpers/db-validators');

const router = Router();
router.get("/", alumnosGet);
router.post(
    "/",
    [
        check("nombre", "El nombre del alumno no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este correo no es valido").isEmail(),
        check("correo").custom(existeEmailA),
        validarCampos
    ], alumnosPost);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check("curso", "No puedes asignarte a mas de 3 cursos").isArray({max: 3}),
        check('curso.*').custom(async (cursoId, {req})=>{
            const alumnoId = req.params.id;
            if(await existeAsignacion(alumnoId, cursoId)){
                throw new Error('El alumno ya esta registrado al curso');
                return true;
            }
        }),
        validarCampos
    ], putAlumnos)
module.exports = router;