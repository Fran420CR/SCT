const { Router } = require('express');
const { getReporte } = require('../controllers/reporte.controller');


const router = Router();

// GET REPORTE COMPLETO
router.get('/', getReporte)


module.exports = router;