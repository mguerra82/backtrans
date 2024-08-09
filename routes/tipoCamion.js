/**
 * Ruta: /api/tipoTrans
 */
 
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { getTipoCamion, crearTipoCamion, updateTipoCamion, delTipoCamion } = require('../controllers/tipoCamion');
const { validarJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/', validarJWT, getTipoCamion);
router.post('/',[
        check('descripcion', 'La descripcion es obligatoria.').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
        crearTipoCamion);
router.put('/:id',[
    check('descripcion', 'La descripcion es obligatoria.').not().isEmpty(),
    validarCampos,
    validarJWT
    ],
    updateTipoCamion)
router.delete('/:id', [
    check('id', 'El id es obligatorio.').not().isEmpty(),validarCampos,
    validarJWT
],delTipoCamion);


module.exports = router;