/**
 * Ruta: /api/camion
 */

const { Router } = require('express');
const { check} = require('express-validator');
const { getCamion, crearCamion, editCamion, delCamion } = require('../controllers/camion');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.get('/',validarJWT, getCamion);
router.post('/', [
    check('placa', 'La placa es obligatoria.').not().isEmpty(),
    check('ctipo', 'El tipo de transporte es obligatorio.').not().isEmpty(),
    check('marca', 'La marca es obligatoria.').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio.').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
],crearCamion);
router.put('/:id',  [
    check('placa', 'La placa es obligatoria.').not().isEmpty(),
    check('ctipo', 'El tipo de transporte es obligatorio.').not().isEmpty(),
    check('marca', 'La marca es obligatoria.').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio.').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], editCamion);
router.delete('/:id',validarJWT, delCamion);

module.exports = router;
