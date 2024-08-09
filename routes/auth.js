/**
 * Ruta: /api/login
 */  

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router(); 


router.post('/',[
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password','El passwor es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;
