/**
 * Ruta: /api/tarifa
 */

const { Router } = require('express');
const { getTarifa, crearTarifa, actualizarTarifa, delTarifa } = require('../controllers/tarifa');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/valida-jwt');

const router = Router();

router.post('/',[
   check('punto_inicial','El punto inicial es obligatorio').not().isEmpty(),
   check('punto_final','El punto final es obligatorio').not().isEmpty(),
   check('valor','El valor  es obligatorio').not().isEmpty(),
   validarCampos,
   validarJWT 
], crearTarifa);
router.get('/',getTarifa);
router.put('/:id',[
   check('punto_inicial','El punto inicial es obligatorio').not().isEmpty(),
   check('punto_final','El punto final es obligatorio').not().isEmpty(),
   check('valor','El valor  es obligatorio').not().isEmpty(),
   validarCampos,
   validarJWT 
], actualizarTarifa);
router.delete('/:id',[
    check('id','El id  es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], delTarifa);

module.exports = router;
