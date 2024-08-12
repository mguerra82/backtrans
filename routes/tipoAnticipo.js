const { Router } = require('express');
const { getTipoAnticipo, creartTipoAnticipo, acualizaTipoAnticipo, delTipoAnticipo } = require('../controllers/tipoAnticipo');
const { validarJWT } = require('../middlewares/valida-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/',validarJWT, getTipoAnticipo);
router.post('/', [
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
],creartTipoAnticipo);
router.put('/:id',acualizaTipoAnticipo);
router.delete('/:id', delTipoAnticipo)

module.exports = router;
