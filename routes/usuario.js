/**
 * 
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios,actualizaUsuario, deleteUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/valida-jwt');

const router = Router();

/**
 * Retorna lista de usuarios.
 * url:GET /api/usuarios
 * @param {*} req 
 * @param {codigo:1, mensaje: consulta satisfactoria} res 
 */
router.get('/',validarJWT, getUsuarios);

router.post('/',[
    check('usuario','El usuario es obligatorio.').not().isEmpty(),
    check('pass','El password es obligatorio.').not().isEmpty(),
    check('rol','El rol es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    validarJWT
],crearUsuarios);

router.put('/:id',validarJWT, actualizaUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;