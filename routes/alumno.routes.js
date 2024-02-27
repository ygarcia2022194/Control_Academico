const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {alumnosPost, 
        alumnosGet,
        putAlumnos}= require('../controllers/alumnoController');
const {existeEmailA, existeAsignacion, buscarCursoPorNombre} = require('../helpers/db-validators');

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
        check('curso.*').custom(async (nombreCursos, {req})=>{
            const alumnoId = req.params.id;
            const curso = await buscarCursoPorNombre(nombreCursos);
            if(!curso){
                throw new Error('El curso especificado no existe');
            }
            const cursoId = curso._id;
            if(await existeAsignacion(alumnoId, cursoId)){
                throw new Error('El alumno ya esta registrado');
            }
        }),
        validarCampos
    ], putAlumnos);
module.exports = router;