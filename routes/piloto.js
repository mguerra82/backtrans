/**
 * Ruta: /api/piloto
 */

const { Router } = require('express');
const { getPilotos, crearPiloto, actualizaPiloto, delPiloto } = require('../controllers/piloto');
const { validarJWT } = require('../middlewares/valida-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/',validarJWT, getPilotos);
router.post('/',[
    check('id_trans', 'El transportista es obligatorio.').not().isEmpty(),
    check('nombres', 'El Nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El Apellido es obligatorio.').not().isEmpty(),
    check('dpi', 'El DPI es obligatorio.').not().isEmpty(),
    check('licencia', 'La licencia es obligatorio.').not().isEmpty(),
    check('fecha_vigencia', 'La fecha de vigencia es obligatorio.').not().isEmpty(),
    check('usr_crea', 'El usuario es obligatorio.').not().isEmpty(),
    validarCampos,
    validarJWT
], crearPiloto);
router.put('/:id',[
    check('id_trans', 'El transportista es obligatorio.').not().isEmpty(),
    check('nombres', 'El Nombre es obligatorio.').not().isEmpty(),
    check('apellidos', 'El Apellido es obligatorio.').not().isEmpty(),
    check('dpi', 'El DPI es obligatorio.').not().isEmpty(),
    check('licencia', 'La licencia es obligatorio.').not().isEmpty(),
    check('fecha_vigencia', 'La fecha de vigencia es obligatorio.').not().isEmpty(),
    check('usr_crea', 'El usuario es obligatorio.').not().isEmpty(),
    validarCampos,
    validarJWT
], actualizaPiloto);
router.delete('/:id',validarJWT,delPiloto );


module.exports = router;
