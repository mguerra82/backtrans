const { Router } = require('express');
const { getTipoAnticipo, creartTipoAnticipo, acualizaTipoAnticipo, delTipoAnticipo } = require('../controllers/tipoAnticipo');

const router = Router();

router.get('/', getTipoAnticipo);
router.post('/', creartTipoAnticipo);
router.put('/:id',acualizaTipoAnticipo);
router.delete('/:id', delTipoAnticipo)

module.exports = router;
