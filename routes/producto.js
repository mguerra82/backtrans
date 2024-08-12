const { Router } = require('express');
const { getProducto, crearProducto, actualizaProducto, delProducto } = require('../controllers/producto');
const { validarJWT } = require('../middlewares/valida-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/',validarJWT, getProducto);
router.post('/', [
    check('nombre', 'El nombre de producto es obligatorio.'),
    validarCampos,
    validarJWT
], crearProducto);
router.put('/:id',[
    check('nombre', 'El nombre de producto es obligatorio.'),
    validarCampos,
    validarJWT
], actualizaProducto);
router.delete('/:id',validarJWT,delProducto);


module.exports = router;
