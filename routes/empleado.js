/**
 * /api/empleado
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpleado, crearEmpleado, actualizaEmpleado, delEmpleado } = require('../controllers/empleado');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/valida-jwt');


const router = Router();

router.get('/', validarJWT, getEmpleado);
router.post('/', [
    check('nombres', 'El nombre es obligatoria.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    check('fecha_ingreso', 'La fecha de ingreso es obligatoria.').not().isEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatorio.').not().isEmpty(),
    check('dpi', 'El DPI es obligatorio').not().isEmpty(),
    check('nit', 'El NIT es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('usr_crea', 'El usuario es obligatorio').not().isEmpty(), 
    validarCampos,
    validarJWT 
],crearEmpleado);
router.put('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(), 
    check('nombres', 'El nombre es obligatoria.').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio.').not().isEmpty(),
    check('fecha_ingreso', 'La fecha de ingreso es obligatoria.').not().isEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatorio.').not().isEmpty(),
    check('dpi', 'El DPI es obligatorio').not().isEmpty(),
    check('nit', 'El NIT es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('usr_crea', 'El usuario es obligatorio').not().isEmpty(), 
    validarCampos,
    validarJWT 
], actualizaEmpleado);
router.delete('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(), 
    validarCampos, validarJWT
], delEmpleado);


module.exports = router;