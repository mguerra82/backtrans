/**
 * Ruta: /api/piloto
 */

const { Router } = require('express');
const { getPilotos, crearPiloto, actualizaPiloto, delPiloto } = require('../controllers/piloto');

const router = Router();

router.get('/', getPilotos);
router.post('/', crearPiloto);
router.put('/', actualizaPiloto);
router.delete('/',delPiloto );


module.exports = router;
