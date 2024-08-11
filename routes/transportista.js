const { Router } = require('express');
const { getTransportista, crearTransportista, delTransportista, updateTransportista } = require('../controllers/transportista');
const { validarJWT } = require('../middlewares/valida-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', validarJWT, getTransportista);
router.post('/',[
    check('nit', 'El NIT es obligatoria.').not().isEmpty(),
    check('razon_social', 'La Razon Social es obligatoria.').not().isEmpty(),
    check('dpi', 'El DPI es obligatoria.').not().isEmpty(),
    check('email', 'El NIT es obligatoria.').isEmail(),
    validarCampos,
    validarJWT
], crearTransportista);
router.put('/:id',[
    check('nit', 'El NIT es obligatoria.').not().isEmpty(),
    check('razon_social', 'La Razon Social es obligatoria.').not().isEmpty(),
    check('dpi', 'El DPI es obligatoria.').not().isEmpty(),
    check('email', 'El NIT es obligatoria.').isEmail(),
    validarCampos,
    validarJWT
], updateTransportista);
router.delete('/:id', validarJWT, delTransportista)


module.exports = router;