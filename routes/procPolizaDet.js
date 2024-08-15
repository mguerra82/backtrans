const { Router } = require('express');
const { getPoilizaDet, crearPoilizaDet, actualizaPoilizaDet, delPoilizaDet } = require('../controllers/proPolizaDet');

const router = Router();

router.get('/', getPoilizaDet);
router.post('/', crearPoilizaDet);
router.put('/', actualizaPoilizaDet);
router.delete('/', delPoilizaDet);


module.exports = router;


