/**
 *Ruta: /api/proc/polizaEnc
 * 
 */


const { Router } = require('express');
const { getPolizaEnc, crearPolizaEnc, actualizaPolizaEnc, delPolizaEnc } = require('../controllers/proPolizaEnc');
const { validarJWT } = require('../middlewares/valida-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/',validarJWT, getPolizaEnc);

router.post('/',[
    check('poliza','La poliza es obligatoria').not().isEmpty(),
    check('id_prod', 'El producto es obligatorio').not().isEmpty(),
    check('peso','El peso es obligatorio').not().isEmpty(),
    check('usuario_cre','El usuario es obligatorio'),
    validarCampos,
    validarJWT,
], crearPolizaEnc);
router.put('/:id', [
    check('poliza','La poliza es obligatoria').not().isEmpty(),
    check('id_prod', 'El producto es obligatorio').not().isEmpty(),
    check('peso','El peso es obligatorio').not().isEmpty(),
    check('usuario_cre','El usuario es obligatorio'),
    validarCampos,
    validarJWT,
],actualizaPolizaEnc);
router.delete('/:id',[
    check('id','El id es obligatorio').not().isEmpty(),
    validarJWT
], delPolizaEnc);

module.exports = router;